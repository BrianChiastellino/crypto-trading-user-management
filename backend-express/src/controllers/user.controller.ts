import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { BadRequestError } from "../errors/bad-request.error";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from "../errors/unauthorized.error";



class UserController {

    async get ( req : Request, res : Response, next : NextFunction ) {

        try {
            const { id } = req.params;                                                  // Obtenemos el id por el parametro /:id

            console.log({ idcontroller : id})

            const user = await userService.get( id );
            // console.log({ userController : user, id  });

            if ( !user || !id )
                throw new BadRequestError('User not found');

            res.status(201).json( user );

        } catch( error ){
            next( error );
        };

    };

    //todo: terminar el update porque no se logra aprecioar el body
    async update ( req : Request, res : Response, next : NextFunction ) {

        try {
            const { id } = req.params; 
            const user = await userService.get( id );
            const userFromBody : User = req.body;

            console.log({ userFromBody });

            if ( !id || !user) 
                throw new BadRequestError(`User not found`)

            const updatedFieldsUser: Partial<User> = {};                                    // Creamos un nuevo objeto con los campos de user 
    
            // Asignamos los campos disintos a updatedFieldsUser
            Object.keys(req.body).forEach((key) => {
                const typedKey = key as keyof User;                                         // Convertimos a una clave válida de User
                if (req.body[typedKey] !== user[typedKey]) {
                    updatedFieldsUser[typedKey] = req.body[typedKey];
                }
            });

            // Si no se realizaron cambios, salimos de la funcion update y no llamamos a la base de datos
            if (Object.keys( updatedFieldsUser ).length === 0)
                return;

            await userService.update(id , updatedFieldsUser );                              // Actualizamos

            const updatedUser = await userService.get( id );                                // Obtenemos el usuario actualizado

            res.status(200).json( updatedUser );
        
        } catch( error ){
            next( error );
        };

    };

    async updatePassword ( req : Request, res : Response, next : NextFunction ) { 
        try { 
            const { id } = req.params;                                                      // Obtenemos el id
            const { currentPassword, newPassword } = req.body;                              // Obtenemos la contraseña actual y la nueva
            const user = await userService.get( id );                                       // Obtenemos el usuario

            if ( !id || !user ) {
                throw new BadRequestError(`User not found`);
            } 

            const { password : passwordUser } = user;                                       // Destructuramos para obtener la contraseña

            const matchPassword = await bcrypt.compare(currentPassword, passwordUser)       // Comparamoslas contraseñas

            console.log({ matchPassword });

            if ( !matchPassword ) {
                throw new UnauthorizedError('Passwords not match');
            }

            const hashedPassword = bcrypt.hashSync( newPassword );                          // Encriptamos la nueva contraseña

            const updatedFieldsUser: Partial<User> = { password: hashedPassword };          // Enviamos la contraseña a un tipo Partial<User>

            console.log({ updatedFieldsUser });

            await userService.update( id , updatedFieldsUser );                             // Actualizamos

            const userUpdated = await userService.get( id );                                // Obtenemos el usuario actualizado 
            
            res.status(200).json( userUpdated );                
        }
        catch ( error ) {
            next( error );
        }
    }

    async delete ( req : Request, res : Response, next : NextFunction ) {

        try {
            const { id } = req.params;
            const user = await userService.get( id );
            
            if ( !id || !user) 
                throw new BadRequestError(`User not found`)

            await userService.delete( id );

            res.status(200).json(` User with id ${ id } was eliminated successful `);
            
        } catch( error ){
            next( error );
        };

    };

};

export default new UserController();
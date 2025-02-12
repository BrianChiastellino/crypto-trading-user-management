import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { BadRequestError } from "../errors/bad-request.error";
import { User } from "../models/user.model";



class UserController {

    async get ( req : Request, res : Response, next : NextFunction ) {

        try {
            const { id } = req.params;                  // Obtenemos el id por el parametro /:id
            const user2 = req.user; 
            console.log({user2});

            const user = await userService.get( id );
            // console.log({ userController : user, id  });

            if ( !user || !id )
                throw new BadRequestError('User not found');

            res.status(201).json( user );

        } catch( error ){
            next( error );
        };

    };

    async update ( req : Request, res : Response, next : NextFunction ) {

        try {
            const { id } = req.params; 
            const user = await userService.get( id );

            if ( !id || !user) 
                throw new BadRequestError(`User not found`)

            // Creamos un nuevo objeto con los campos de user 
            const updatedFieldsUser: Partial<User> = {};
    
            // Asignamos los campos disintos a updatedFieldsUser
            Object.keys(req.body).forEach((key) => {
                const typedKey = key as keyof User;                 // Convertimos a una clave válida de User
                if (req.body[typedKey] !== user[typedKey]) {
                    updatedFieldsUser[typedKey] = req.body[typedKey];
                }
            });

            // Si no se realizaron cambios, salimos de la funcion update y no llamamos a la base de datos
            if (Object.keys( updatedFieldsUser ).length === 0)
                return;

            // Actualizamos
            await userService.update(id , updatedFieldsUser );

            // Obtenemos el usuario actualizado
            const updatedUser = await userService.get( id );

            res.status(200).json( updatedUser );
        
        } catch( error ){
            next( error );
        };

    };

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
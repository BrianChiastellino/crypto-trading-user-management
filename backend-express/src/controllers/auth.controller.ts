import { NextFunction, Request, Response } from "express";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppDataSource } from "../database/database";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";
import userService from "../services/user.service";

import { BadRequestError } from '../errors/bad-request.error';
import { UnauthorizedError } from "../errors/unauthorized.error";
import { UserAuthDTO } from "../dtos/auth-user.dto";


const { JWT_SCRET_KEY : jwtScretKey } = process.env;

class AuthController {

    async login ( req : Request, res : Response, next : NextFunction ) {
        try {
            const loginDTO : UserAuthDTO = req.body;
            const { email, document, username, password } = loginDTO;
            console.log({loginDTO})

            const user = await userService.getBy({ document, email, username });

            console.log({ user })

            if ( !user ) 
                throw new UnauthorizedError('Invalid username or password');

            if ( !bcrypt.compareSync( password, user.password )) 
                throw new UnauthorizedError('Invalid username or password');

            const token = jwt.sign({ id : user.id, admin : user.admin}, jwtScretKey! , { expiresIn : '1h'})

            res.status(200).json({ token, user });

        } catch ( error ) {
            next( error );
        }     
    }

    async register ( req : Request, res : Response, next : NextFunction ) {
        try {
            const registerDTO : UserAuthDTO = req.body;

            const { document, email, username, password } = registerDTO;

            const userExists = await userService.getBy({ document, email, username });

            if ( !!userExists ) 
               throw new  BadRequestError('User already exists');

            const [ userCreated ] = [userRepository.create({        // Destrucutramos el array 
                ...registerDTO,                                            
                password: bcrypt.hashSync(password),       
                admin: !await userService.hasAnyUsers(),            // Creamos el admin en caso de que no haya usuarios registrados
            })].flat(); 

    
            const user = await userService.create( userCreated );

            res.status(201).json( user );

        } catch ( error ) {
            next( error );
        }
    }

}

export default new AuthController();
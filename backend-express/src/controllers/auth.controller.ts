import { NextFunction, Request, Response } from "express";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { AppDataSource } from "../database/database";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";
import userService from "../services/user.service";

import { BadRequestError } from '../errors/bad-request.error';
import { UnauthorizedError } from "../errors/unauthorized.error";


const { JWT_SCRET_KEY : jwtScretKey } = process.env;

class AuthController {

    async login ( req : Request, res : Response, next : NextFunction ) {
        try {
            const { email, document, username, password } = req.body;

            const user = await userService.getBy({ document, email, username });

            if ( !user ) 
                throw new UnauthorizedError('Invalid username or password');

            if ( !bcrypt.compareSync( password, user.password )) 
                throw new UnauthorizedError('Invalid username or password');

            const token = jwt.sign({ id : user.id, admin : user.admin}, jwtScretKey! , { expiresIn : '1h'})

            sessionStorage.setItem('token', token);
            res.status(200).json({ token, payload: { id: user.id, admin: user.admin } });

        } catch ( error ) {
            next( error );
        }     
    }

    async register ( req : Request, res : Response, next : NextFunction ) {
        try {
            const { body } = req;
            const { email, document, username } = body;

            const userExists = await userService.getBy({ document, email, username });

            if ( !!userExists ) 
               throw new  BadRequestError('User already exists');

            const user: User = userRepository.create({
                ...body,
                password: bcrypt.hashSync(body.password),       // Encriptamos la password
                admin: !await userService.hasAnyUsers(),        // Asignación de admin de forma directa
            })[0];                                              // Obtenemos el user en la posicion 0

            await userService.create( user );

            res.status(201).json( user );

        } catch ( error ) {
            next( error );
        }
    }

}


export default new AuthController();
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

import jwt from 'jsonwebtoken';
import { User } from "../models/user.model";

const { JWT_SCRET_KEY : jwtScretKey } = process.env;

//todo: Generar DTO para el paylaod

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    try {

        const token = req.headers['authorization']?.split(' ')[1];          // Obtenemos el token del header Authorization
        console.log({ tokenMiddleware: token })

        if (!token) {
            throw new UnauthorizedError('Token not provider ');
        }

        jwt.verify( token, jwtScretKey!, ( error, decoded ) => {

            if ( error || !decoded ) 
                throw new UnauthorizedError('Invalid or expired token ');

            req.userPayloadDTO = decoded as User;

            next();
        });

    } catch (error) {
        next(error)
    }

};
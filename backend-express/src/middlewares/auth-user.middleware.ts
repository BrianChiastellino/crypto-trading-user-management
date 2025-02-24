import { NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "../errors/unauthorized.error";

// Middleware para verificar que sea un usaurio comun

export const authUser = ( req : Request, res : Response, next : NextFunction ) : void => {
    try {
        const isUser : boolean = req.userPayloadDTO.admin;

        if ( isUser )
            throw new UnauthorizedError('Acces denied. Not requires admin');

        next();
    } catch ( error ) {
        next( error );
    }
}
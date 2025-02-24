import { NextFunction, Request, Response } from "express"
import { UnauthorizedError } from "../errors/unauthorized.error";

// Middleware para verificar que no haya nadie logueado

export const noAuth = ( req : Request, res : Response, next : NextFunction ) : void => {
    try {
        const isAuth = req.userPayloadDTO

        if ( !!isAuth )
            throw new UnauthorizedError('Acces denied. Already login');

        next();
    } catch ( error ) {
        next( error );
    }
}
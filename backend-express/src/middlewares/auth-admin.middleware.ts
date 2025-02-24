import { NextFunction, Request, Response } from "express"

import { UnauthorizedError } from "../errors/unauthorized.error";

// Middleware para verificar que sea un administador

export const authAdmin = ( req : Request, res: Response, next : NextFunction) : void => {
    try {
        const isAdmin : boolean = req.userPayloadDTO.admin; 
        console.log({ isAdmin });

        if ( !isAdmin ) 
            throw new UnauthorizedError('Access denied. Requires administrator');
        
        next();
    } catch( error ) {
        next( error )
    }
}
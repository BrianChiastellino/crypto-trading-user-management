import { NextFunction, Request, Response } from "express"

import { UnauthorizedError } from "../errors/unauthorized.error";




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
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import { BadRequestError } from "../errors/bad-request.error";

import { validateEmail } from "../validators/email.validator";
import { valdiateUsername } from "../validators/username.validator";
import { validateDocument } from "../validators/document.validator";
import { validatePassword } from "../validators/password.validator";
import { validateName } from "../validators/name.validator";




export const validateRegister = [
    validateName,
    validateEmail,
    valdiateUsername,
    validateDocument,
    validatePassword,


    ( req : Request, res : Response, next : NextFunction ) => {

        try {
            const errors = validationResult( req );

            if ( !errors.isEmpty() ) {
                errors.array().forEach( ( { msg }) =>  {
                    throw new BadRequestError( msg );
                });
            }

            next();

        } catch( error ) {
            next( error );
        }
     
    }
]
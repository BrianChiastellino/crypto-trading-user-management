import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/custom-error";

/* 
   Middleware global para manejar errores en Express.  
   - Si el error es una instancia de `CustomError`, se responde con su `statusCode` y `serialize()`.  
   - Si no es un error conocido, se responde con un código 500 y un mensaje genérico.  
   - Se coloca al final de `app.ts` con `app.use(errorHandler)`.  
*/

export const errorHandler: ErrorRequestHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof CustomError) {
        res.status(error.statusCode).json(error.serialize());
        return;
    }

    res.status(500).json({
        message: 'Ocurrió un error inesperado',
        error: error.message,
    });
};

import { body } from "express-validator";
import { userRepository } from "../repositories/user.repository";
import { BadRequestError } from "../errors/bad-request.error";



export const validateDocument = body('document')
.notEmpty().withMessage('Document is required')
.matches(/^\d+$/).withMessage('Document format is not valid ')
.custom( async ( document ) => {
    const user = await userRepository.findOne({ where : { document }});

    if ( user ) {
        throw new BadRequestError('Document already exists');
    };
});
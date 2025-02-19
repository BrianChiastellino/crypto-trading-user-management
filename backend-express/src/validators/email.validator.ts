import { body } from "express-validator";
import { userRepository } from "../repositories/user.repository";
import { BadRequestError } from "../errors/bad-request.error";
import { emailPattern } from "../utils/email-pattern";


export const validateEmail = body('email')
.notEmpty().withMessage('Email is required')
.matches( emailPattern ).withMessage('Email format is not valid')
.custom( async ( email ) => {
    const user = await userRepository.findOne({ where : { email }});

    if ( user )
        throw new BadRequestError('Email already exists');
});
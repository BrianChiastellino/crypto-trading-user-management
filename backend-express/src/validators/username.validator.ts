import { body } from "express-validator";
import { userRepository } from "../repositories/user.repository";
import { BadRequestError } from "../errors/bad-request.error";



export const valdiateUsername = body('username')
.notEmpty().withMessage('Username is required')
.custom( async ( username ) => {
    const user = await userRepository.findOne({ where : { username }});

    if ( user ) {
        throw new BadRequestError('Username already exists');
    };
});
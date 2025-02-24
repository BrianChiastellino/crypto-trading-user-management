import { body } from "express-validator";
import { passwordPattern } from "../utils/password-pattern";



export const validatePassword = body('password')
.notEmpty().withMessage('Password is required')
.isLength({ min : 6}).withMessage('Min length is 6')
.matches( passwordPattern ).withMessage('Password format is not valid');
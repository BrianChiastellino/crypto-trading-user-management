import { body } from "express-validator";



export const validateName = body('name')
.notEmpty().withMessage('Name is required')
.matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage('Name format is not valid');

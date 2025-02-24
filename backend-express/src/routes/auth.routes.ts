import authController from '../controllers/auth.controller';
import express from 'express';
import { validateRegister } from '../middlewares/register.middleaware';

const router = express.Router();

router.post('/register',
    validateRegister,                       // Middleware para valdiar los campos del formulario
    
    authController.register );
    
router.post('/login', authController.login );


export default router;
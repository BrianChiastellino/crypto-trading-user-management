import express from 'express';
import userController from '../controllers/user.controller';
import { validatePassword } from '../validators/password.validator';


const router = express.Router();

router.put('/password/:id', validatePassword ,userController.updatePassword)

router.route('/:id')
.get( userController.get )
.put( userController.update )
.delete( userController.delete )


export default router;
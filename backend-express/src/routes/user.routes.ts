import express from 'express';
import userController from '../controllers/user.controller';


const router = express.Router();

router.route('/:id')
.get( userController.get )
.put( userController.update )
.delete( userController.delete )


export default router;
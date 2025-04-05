import express from 'express';
import walletController from '../controllers/wallet.controller';



const router = express.Router();

router.post('', walletController.create );

router.route('/:id')
.get( walletController.get )
.put( walletController.update )
.delete( walletController.delete );


export default router;
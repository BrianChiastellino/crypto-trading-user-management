import express from 'express';
import adminController from '../controllers/admin.controller';
import walletController from '../controllers/wallet.controller';
 '../controllers/admin.controller';


const router = express.Router();

router.get('/users', adminController.getUsers );
router.get('/transacciones', adminController.getTransactions );
router.get('/walletByID/:id', walletController.get );


export default router;
import express from 'express';
import transactionController from '../controllers/transaction.controller';



const router = express.Router();

router.post('/create', transactionController.create );
router.get('/get', transactionController.get );


//todo: Probar si adna con el route vacio
// router.route('')
// .get( transactionController.get )



export default router;
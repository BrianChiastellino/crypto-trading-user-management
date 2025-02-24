
import { Request, Response, NextFunction } from "express";
import { TransactionDTO } from "../dtos/transaction.dto";
import { TransactionType } from "../utils/transaction.type-enum";
import { CoinDTO } from "../dtos/coin.dto";
import { transactionRepository } from "../repositories/transaction.repository";
import transactionService from "../services/transaction.service";
import { BadRequestError } from "../errors/bad-request.error";


class TransactionController {

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { id : userID } = req.userPayloadDTO;
            const transactionDTO : TransactionDTO = req.body;
            const coin : CoinDTO = req.body;

            const [ transactionCredated ] = [transactionRepository.create({
                ...transactionDTO,
                coinID : coin.id,
                userID : userID,
            })].flat();

            console.log({ transactionCredated });

            const transaction = await transactionService.create( transactionCredated );

            res.status(201).json( transaction );
        } catch (error) {
            next(error);
        };

    };

    async get (req: Request, res: Response, next: NextFunction) {
        try {
            const { id : userID } = req.userPayloadDTO;
            const transactions = await transactionService.getByUserID( userID );

            if ( !userID || transactions.length < 0) 
                throw new BadRequestError(`Transactions not found`);

            res.status(200).json( transactions )

        } catch (error) {
            next(error);
        };

    };
}


export default new TransactionController();
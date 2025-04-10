import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";
import userService from "../services/user.service";
import { BadRequestError } from "../errors/bad-request.error";
import { Wallet } from "../models/wallet.model";
import walletService from "../services/wallet.service";

import transactionService from "../services/transaction.service";
import { Transaction } from "../models/transaction.model";



class AdminController {

    async getUsers ( req : Request, res : Response, next : NextFunction ) {
        try {
            const users : User[] = await userService.getAll();

            if ( users.length < 0 )
                throw new BadRequestError('Not exists users in database');
    
            res.status(200).json(users);
        } catch ( error ) {
            next( error )
        };
    }

    async getWallets ( req : Request, res : Response, next : NextFunction ) {
        try {
            const wallets : Wallet[] = await walletService.getAll();

            if ( wallets.length < 0 )
                throw new BadRequestError('Not exists wallets in database');
    
            res.status(200).json(wallets);
        } catch ( error ) {
            next( error )
        };
    }

    async getTransactions ( req : Request, res : Response, next : NextFunction ) {
        try {
            const transactions : Transaction[] = await transactionService.getAll();

            if ( transactions.length < 0 )
                throw new BadRequestError('Not exists transactions in database');
            
            res.status(200).json(transactions);
        } catch( error ) {
            next( error );
        };
    }

}



export default new AdminController();
import { DeleteResult, UpdateResult } from "typeorm";
import { Transaction } from "../models/transaction.model";
import { User } from "../models/user.model";
import { transactionRepository } from "../repositories/transaction.repository";



//todo:
class TransactionService {

    async create ( transaction : Transaction ) : Promise<Transaction | null> {
        return await transactionRepository.save( transaction );
    }

    async getAll () : Promise<Transaction[]> {
        return await transactionRepository.find();
    }

    async get ( id : Transaction['id'] ) : Promise<Transaction | null> {
        return await transactionRepository.findOneBy({ id });
    }

    async getByUserID ( userID : User['id']) : Promise<Transaction[]> {
        return await transactionRepository.findBy({ userID })
    }

    async update ( id : Transaction['id'] ,transactionFieldsToUpdate : Partial<Transaction> ) : Promise<UpdateResult> {
        return await transactionRepository.update( id, transactionFieldsToUpdate );
    }

    async delete ( id : Transaction['id']) : Promise<DeleteResult> {
        return await transactionRepository.delete( id );
    }
}


export default new TransactionService();
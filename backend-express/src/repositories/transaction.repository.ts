import { Repository } from "typeorm";
import { Transaction } from "../models/transaction.model";
import { AppDataSource } from "../database/database";


export const transactionRepository : Repository<Transaction> = AppDataSource.getRepository(Transaction);

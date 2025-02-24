import { Transaction } from "../models/transaction.model";
import { TransactionType } from "../utils/transaction.type-enum";


export class TransactionDTO {
    id : Transaction['id'];
    coinAmount : Transaction['coinAmount'];
    type : TransactionType
};
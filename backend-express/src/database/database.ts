import { DataSource } from 'typeorm';
import { User } from '../models/user.model';
import { Wallet } from '../models/wallet.model';
import { Coin } from '../models/coin.model';
import { Transaction } from '../models/transaction.model';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, } = process.env;

export const AppDataSource = new DataSource({

    type:   'mysql',
    host:   DB_HOST,
    port:   Number(DB_PORT),
    username:   DB_USERNAME,
    password:   DB_PASSWORD,
    database:   DB_DATABASE,
    synchronize:    true,
    logging:    true,
    entities:   [User, Wallet, Coin, Transaction],
    subscribers:    [],

});
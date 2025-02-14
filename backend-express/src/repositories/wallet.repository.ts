import { Repository } from "typeorm";
import { Wallet } from "../models/wallet.model";
import { AppDataSource } from "../database/database";


export const walletRepository : Repository<Wallet> = AppDataSource.getRepository(Wallet);
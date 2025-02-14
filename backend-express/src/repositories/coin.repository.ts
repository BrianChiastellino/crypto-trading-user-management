import { Repository } from "typeorm";
import { Coin } from "../models/coin.model";
import { AppDataSource } from "../database/database";


export const coinRepository : Repository<Coin> = AppDataSource.getRepository(Coin);

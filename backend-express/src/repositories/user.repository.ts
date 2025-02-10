import { Repository } from "typeorm";
import { User } from "../models/user.model";
import { AppDataSource } from "../database/database";



export const userRepository : Repository<User> = AppDataSource.getRepository(User);
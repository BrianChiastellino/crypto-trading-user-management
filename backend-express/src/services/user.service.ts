import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/database";
import { User } from "../models/user.model";


class UserService {

    async create ( user : User ) : Promise<User | null> {
        return await AppDataSource.manager.save( user );
    };

    async get ( id : User['id']) : Promise<User | null> {
        return await AppDataSource.manager.findOneBy(User, { id })
    };

    async update ( id : User['id'], userFieldsToUpdate : Partial<User> ) : Promise<UpdateResult> {
        return await AppDataSource.manager.update(User, { id }, userFieldsToUpdate)
    };

    async delete ( id : User['id'] ) : Promise<DeleteResult> {
        return await AppDataSource.manager.delete(User, { id });
    };

};


export default new UserService();
import { DeleteResult, UpdateResult } from "typeorm";


import { AppDataSource } from "../database/database";
import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";


class UserService {

    async create ( user : User ) : Promise<User | null> {
        return await userRepository.save( user );
    };

    async get ( id : User['id']) : Promise<User | null> {
        return await userRepository.findOneBy({ id })
    };

    // Obtenemos el usuario por documento, email, username para el login o registro
    async getBy( { document, email, username }: Partial<User> ): Promise<User | null> {  // Destrucutramos el parametro
        return await userRepository.findOne({
            where: [{ document, username, email }] });                                   // Encontramos el usuario por documento, username, email
    }

    // Obtenemos un booleano para saber si hay usuarios en el sistema
    public async hasAnyUsers(): Promise<boolean> {
        const userCount  = await userRepository.count()
        return userCount > 0;
    }

    async update ( id : User['id'], userFieldsToUpdate : Partial<User> ) : Promise<UpdateResult> {
        return await userRepository.update( id , userFieldsToUpdate)
    };

    async delete ( id : User['id'] ) : Promise<DeleteResult> {
        return await userRepository.delete( id );
    };

};


export default new UserService();
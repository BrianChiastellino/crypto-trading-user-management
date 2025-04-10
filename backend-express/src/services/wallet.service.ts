import { DeleteResult, UpdateResult } from "typeorm";
import { User } from "../models/user.model";
import { Wallet } from "../models/wallet.model";
import { walletRepository } from "../repositories/wallet.repository";


//todo: Implementar logica de negocio

class WalletService {

    async create ( wallet : Wallet ) : Promise<Wallet | null> {
        return await walletRepository.save( wallet );
    };

    async getAll () : Promise<Wallet[]> {
        return await walletRepository.find();
    };

    async get ( id : Wallet['id']) : Promise<Wallet | null> {
        return await walletRepository.findOneBy({ id });
    };

    async getByUserID ( userID : User['id']) : Promise<Wallet | null> {
        console.log({ userID })
        const data = await walletRepository.findOneBy({ userID })
        console.log({ data });
        return data; 
    };

    //todo: Crear bien el update de la wallet
    async update ( id : Wallet['id'], walletFieldsToUpdate : Partial<Wallet> ) : Promise<UpdateResult> {
        return await walletRepository.update( id , walletFieldsToUpdate );
    };

    //todo: Si el usuario tiene coins, o fondos no eliminar.
    async delete ( id : Wallet['id']) : Promise<DeleteResult> {
        return await walletRepository.delete( id );
    };
}


export default new WalletService();
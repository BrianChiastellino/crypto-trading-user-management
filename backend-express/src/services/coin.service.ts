import { Coin } from "../models/coin.model";
import { coinRepository } from "../repositories/coin.repository";



//todo: hacer el update para que sepamos de que walletID esta gaurdada.
class CoinService {
    async create ( coin : Coin ) : Promise<Coin> {
        return await coinRepository.save( coin );
    };

}


export default new CoinService();
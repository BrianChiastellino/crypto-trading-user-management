import { Coin } from "../models/coin.model";


export class CoinDTO {
    id : Coin['id'];
    symbol : Coin['symbol'];
    coinAmount : Coin['coinAmount'];
    image : Coin['image'];
};
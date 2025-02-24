import { Wallet } from '../models/wallet.model';



export class WalletDTO {
    id : Wallet['id'];
    funds : Wallet['funds'];
};
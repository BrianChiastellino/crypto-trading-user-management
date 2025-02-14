import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Wallet } from "./wallet.model";
import { Transaction } from "./transaction.model";

@Entity()
export class Coin {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    symbol: string;

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    coinAmount: number;

    @Column()
    image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => Wallet, wallet => wallet.coins)
    wallet: Wallet;

    
    @OneToMany(() => Transaction, transaction => transaction.coin)
    /**
     * Relación OneToMany:
     * - Una moneda puede estar en muchas transacciones.
     * - No crea columna en Coin, pero sí en Transaction (coinId).
     */
    transactions: Transaction[];


}

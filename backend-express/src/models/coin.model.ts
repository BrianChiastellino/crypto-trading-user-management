import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Wallet } from "./wallet.model";
import { Transaction } from "./transaction.model";

@Entity()
export class Coin {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    symbol: string;

    @Column({ type: 'double'})
    coinAmount: number;

    @Column()
    image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;

    @ManyToOne(() => Wallet, wallet => wallet.coins)
    wallet: Wallet;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany(() => Transaction, transaction => transaction.coin)
    /**
     * Relación OneToMany:
     * - Una moneda puede estar en muchas transacciones.
     * - No crea columna en Coin, pero sí en Transaction (coinId).
     */
    transactions: Transaction[];


}

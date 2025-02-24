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

    @ManyToOne(() => Wallet, wallet => wallet.coins)
    wallet: Wallet;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

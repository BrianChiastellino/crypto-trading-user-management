import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

import { Coin } from './coin.model';
import { User } from './user.model';
import { TransactionType } from '../utils/transaction.type-enum';


@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'double', precision: 10, scale: 2 })
    coinAmount: number;

    @Column({ type: 'enum', enum: TransactionType })
    type: TransactionType;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne(() => User )
    @JoinColumn({ name : 'userID'})
    userID : User['id']

    @OneToOne(() => Coin )
    @JoinColumn({ name : 'coinID'})
    coinID : Coin['id']
}

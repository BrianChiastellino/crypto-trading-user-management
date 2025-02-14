import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Coin } from './coin.model';
import { User } from './user.model';


export enum TransactionType {
    BUY = 'buy',
    SELL = 'sell',
}

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

    @ManyToOne(() => User, user => user.transactions, { eager: true })
    /**
     * Relación ManyToOne:
     * - Muchas transacciones pertenecen a un usuario.
     * - El primer parámetro () => User indica la entidad relacionada.
     * - El segundo parámetro user => user.transactions indica la propiedad inversa en User.
     * - Crea una columna 'userId' en la tabla Transaction como clave foránea.
     * - eager: true permite que se cargue automáticamente la relación al consultar Transaction.
     */
    user: User;


    @ManyToOne(() => Coin, coin => coin.transactions, { eager: true })
    /**
     * Relación ManyToOne:
     * - Muchas transacciones involucran una moneda específica.
     * - Crea una columna 'coinId' en Transaction como clave foránea.
     */
    coin: Coin;

}

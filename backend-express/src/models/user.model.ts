import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Wallet } from "./wallet.model";
import { Transaction } from "./transaction.model";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column({type: 'varchar'})
    name : string

    @Column({ type: 'varchar', unique: true })
    email : string

    @Column({ type: 'varchar', unique: true })
    username : string

    @Column({ type: 'varchar' })
    password : string
    
    @Column({ type: 'varchar', unique: true })
    document : string

    @Column({ type: 'boolean', default: false })
    admin   :   boolean

    @CreateDateColumn()
    createdAt : Date;

    @UpdateDateColumn()
    updateAt : Date;

    @OneToOne(() => Wallet, wallet => wallet.user)
    @JoinColumn()
    /**
     * Relación OneToOne:
     * - Un usuario tiene una wallet.
     * - @JoinColumn() indica que la columna de clave foránea estará en User.
     * - Crea una columna 'walletId' en User.
     */
    wallet: Wallet;


   
    @OneToMany(() => Transaction, transaction => transaction.user)
    /**
    * Relación OneToMany:
    * - Un usuario puede tener muchas transacciones.
    * - El primer parámetro () => Transaction indica la entidad relacionada.
    * - El segundo parámetro transaction => transaction.user especifica la propiedad inversa en Transaction.
    *   - Esta relación no crea una columna en la tabla User, pero sí en Transaction.
    */
    transactions: Transaction[];


}
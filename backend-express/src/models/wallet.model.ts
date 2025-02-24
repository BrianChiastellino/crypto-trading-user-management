import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";
import { User } from "./user.model";
import { Coin } from "./coin.model";

@Entity()
export class Wallet {
    
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type : 'double', default: 0 })
    funds : number;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @OneToOne( () => User )                         // Relacion 1 a 1
    @JoinColumn({ name : 'userID'})                 // Hacemos un join y decimos que userID es el fk de User
    userID : User['id']

    @OneToMany(() => Coin, ( coin ) => coin.wallet, { nullable : true } )
    coins : Coin[]


} 
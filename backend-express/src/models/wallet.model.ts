import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn,  } from "typeorm";

import { Coin } from "./coin.model";
import { User } from "./user.model";


@Entity()
export class Wallet {
    
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type : 'number'})
    funds : number;
    
    @OneToOne(() => User, user => user.wallet)
    /**
     * Relación OneToOne inversa:
     * - Una wallet pertenece a un usuario.
     * - No se crea columna aquí, solo en User.
     */
    user: User;


    @OneToMany(() => Coin, coin => coin.wallet, { cascade : true })
    /**
     * Relacion OneToMany 
     * - Una Wallet puede contener muchas coins
     */
    coins : Coin[];

} 
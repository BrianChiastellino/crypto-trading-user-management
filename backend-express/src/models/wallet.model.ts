import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";
import { User } from "./user.model";
import { Coin } from "./coin.model";




@Entity()
export class Wallet {
    
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({ type : 'double'})
    funds : number;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

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
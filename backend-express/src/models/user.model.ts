import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

}
import { Tasks } from "src/Task-info/Task.Entity";

import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('Notification')
export class notification{
    @PrimaryGeneratedColumn()
    notification_ID :number;

    @Column()
    message:string;

    @Column()
    userid:number;

    @CreateDateColumn()
    createAt : Date;

    @ManyToOne(() => Tasks,(task)=> task.notifications )
    
    task:Tasks;
}


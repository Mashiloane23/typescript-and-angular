import { Tasks } from "src/Task-info/Task.Entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('Task_user')
export class TaskUser{
    @PrimaryGeneratedColumn()
    id:number;

    


    @ManyToOne(() => Tasks,(task) =>task.taskuser)
    @JoinTable({name:'Taskid'})
    
    task :Tasks;

    @ManyToOne(() => User , (user) =>user.taskuser )
    @JoinTable({name:'userid'})
    user:User;

    

    



}
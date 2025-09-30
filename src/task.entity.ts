import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { taskstatus } from './Task-info/task-status.enum';
import { User } from './user/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tittle: string;

  @Column()
  description: string;

  @Column()
  status:taskstatus;


  // @ManyToOne(type => User, (user)=> user.task,{eager:false})
  // @Exclude({toPlainOnly: true})
  // user : User;
}


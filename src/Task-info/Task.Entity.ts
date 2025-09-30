import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, JoinTable, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
 
import { TaskUser } from 'src/Task_user/Task_user.Entity';
import { GroupTask } from 'src/GroupTsk/GroupTask.entity';
import { taskstatus } from 'src/Task-info/task-status.enum';
import { notification } from 'src/notification/notification.entity';


@Entity('task')
export class Tasks {
  @PrimaryGeneratedColumn({ name: 'taskid' })
  taskid: number;

  @Column({ unique: true })
  @IsString()
  taskname: string;

  @Column({unique:true})
  @IsString()
  description: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  startdate: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastModified: Date;

  @Column({ type: 'enum', enum: taskstatus, default: taskstatus.OPEN })
  taskstatus: taskstatus;

  @Column({type:'date'})
  DueDate:Date;

  @BeforeInsert()
  @BeforeUpdate()
  updateLastModified() {
    this.lastModified = new Date(); 
    if (this.taskstatus ) {
      this.taskstatus = this.taskstatus as taskstatus;
    }
  }

  @OneToMany(() => TaskUser, (taskuser) => taskuser.task, { cascade: ['remove'], eager:true })
  taskuser: TaskUser[];

  @OneToMany(() => GroupTask, (grouptask) => grouptask.task)
  groupTask: GroupTask[];

 @OneToMany(()=> notification,(notifications)=> notifications.task)
 notifications:notification[];

  
}



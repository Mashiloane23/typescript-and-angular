import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Tasks } from 'src/Task-info/Task.Entity';
import { task } from 'src/task.entity';
import { Taskrepository } from 'src/task.repository';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {

    constructor(private eventEmitter:EventEmitter2,
        @InjectRepository(Tasks)
        private taskrepo:Repository<Tasks>,
        @InjectRepository(User)
        private userrepo:Repository<User>
    ){}

    async asssigntasknotification(userid:number,taskid:number):Promise<any>{

        const getuser = await this.userrepo.findOne({where:{userid}});

        if(!getuser){
            throw new NotFoundException(`the userid is not found`);
        }

       const gettask = await  this.taskrepo.findOne({where:{taskid}})
       

       if(!gettask){
        throw new NotFoundException('taskid is not found');
       }
        
       const message = `Hello ${getuser.username} you've been assigned new task by the name of ${gettask.taskname}`;

       this.eventEmitter.emit('taskAssigned',{
        userId:userid,
        taskid,
        taskname:gettask.taskname,
        message
       });

       return{
        success:true,
        message,
       }
    }
}

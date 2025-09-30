import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tasks } from "./Task.Entity";
import { TaskService } from "./Task.service";
import { TaskUser } from "src/Task_user/Task_user.Entity";
import { User } from "src/user/user.entity";
import { Taskrepository } from "src/task.repository";
import { TaskController } from "./Task.Controller";
import { GroupTask } from "src/GroupTsk/GroupTask.entity";

import { taskservice } from './newTaskservice';

import { NotificationService } from 'src/notification/notification.service';
import { notificationcontroller } from 'src/notification/notificatio.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { EmailModule } from 'src/Email/Email.Module';

@Module({
    imports:[TypeOrmModule.forFeature([Tasks,TaskUser,User,GroupTask]),],
    providers:[TaskService,taskservice],
    controllers:[TaskController,],
    exports:[TaskService,TypeOrmModule,taskservice],
    
})
export class TaskModule{}
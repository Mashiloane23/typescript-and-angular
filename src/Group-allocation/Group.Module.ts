import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./Group.entity";
import { Groupuser } from "src/Group-user/groupUser.entity";
import { User } from "src/user/user.entity";
import { GroupService } from "./Group.service";
import { Groupcontroller } from "./Group.controller";
import { Tasks } from "src/Task-info/Task.Entity";
import { GroupTask } from "src/GroupTsk/GroupTask.entity";
import { TaskModule } from "src/Task-info/Tasks.module";
import { TaskService } from "src/Task-info/Task.service";


@Module({
    imports:[TypeOrmModule.forFeature([Group,Groupuser,User,GroupTask]),TaskModule],
    providers:[GroupService],
    controllers:[Groupcontroller],
   exports:[GroupService]
    
})

export class GroupModule{}
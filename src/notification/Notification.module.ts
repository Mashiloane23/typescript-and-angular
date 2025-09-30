import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { notification } from "./notification.entity";
import { NotificationService } from "./notification.service";
import { notificationcontroller } from "./notificatio.controller";
import { Tasks } from "src/Task-info/Task.Entity";
import { User } from "src/user/user.entity";
import { EventEmitterModule } from "@nestjs/event-emitter";


@Module({
    imports:[TypeOrmModule.forFeature([notification,Tasks,User]),EventEmitterModule.forRoot()],
    providers:[NotificationService],
    controllers:[notificationcontroller],
    exports:[NotificationService]
})

export class notificationmodule{}
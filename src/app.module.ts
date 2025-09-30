import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { taskmodule } from './task.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { User } from './user/user.entity';


import { task } from './task.entity';
import { Roles } from './role/role.entity';
import { useroles } from './userrole/userole.entity';
import { Tasks } from './Task-info/Task.Entity';
import { TaskUser } from './Task_user/Task_user.Entity';
import { Groupuser } from './Group-user/groupUser.entity';
import { Group } from './Group-allocation/Group.entity';

import { GroupTask } from './GroupTsk/GroupTask.entity';
import { RoleGuard } from './role/role.guard';

// import { EmailModule } from './Email/Email.Module';
// import {  Roles } from './role/role.entity';
import { NotificationService } from './notification/notification.service';
import { notification } from './notification/notification.entity';
import { notificationmodule } from './notification/Notification.module';


dotenv.config();

@Module({
  imports: [

    ConfigModule.forRoot({
      
      isGlobal: true,
    }),
    
    
    taskmodule,
    notificationmodule,
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configservice : ConfigService) => {
        
        ConfigModule.forRoot({
          envFilePath:'.env.stage.dev',
          isGlobal:true,
        })
        return{
          type: 'postgres',
          host: configservice.get<string>('DB_HOST'),
          port: configservice.get<number>('DB_PORT'),
          username: configservice.get<string>('DB_USERNAME'),
          password: configservice.get<string>('DB_PASSWORD'),
          database: configservice.get<string>('DB_DATABASE'),
          autoLoadEntities: false,
          synchronize: true,
          entities: [User, Roles,useroles,Tasks,TaskUser,Groupuser,Group,GroupTask,notification],
          logging: true,
          extra: {
            max: 2000000, 
            min: 5000,  
            idleTimeoutMillis: 30000, 
          },
          

        };
      },
    }),
    AuthModule 
  ],

  controllers: [AppController],
  providers: [AppService,RoleGuard, ],
})
export class AppModule {
  
}

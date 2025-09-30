import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './jwt.strategy';
import { serviceRole } from 'src/role/role.service';
import { Roles } from 'src/role/role.entity';
import { useroles } from '../userrole/userole.entity';
import { userservice } from 'src/user/user.service';
import { usercontroller } from 'src/user/user.controller';
import { rolecontroller } from 'src/role/role.controller';
import { userroleserv } from 'src/userrole/userrole.service';
import { rolescontrollerForStoredProcedure } from 'src/userrole/controller.userrole';
import { TaskService } from 'src/Task-info/Task.service';
import { TaskController } from 'src/Task-info/Task.Controller';
import { Tasks } from 'src/Task-info/Task.Entity';
import { TaskModule } from 'src/Task-info/Tasks.module';
import { Taskrepository } from 'src/task.repository';
import { GroupModule } from 'src/Group-allocation/Group.Module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationService } from 'src/notification/notification.service';
import { notificationcontroller } from 'src/notification/notificatio.controller';
import { AccountLockGuard } from './Canactivate';
import { JwtAuthGuard } from './JWT';
// import { Authguard } from './auth.guard';
// import { EmailModule } from 'src/Email/Email.Module';

@Module({
  imports :[ PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({secret:'topSecret51', signOptions:{expiresIn:'1h'}}),
     TypeOrmModule.forFeature([User,Roles,useroles,Tasks]),TaskModule,GroupModule,
    ],
  
  
  providers: [AuthService,JwtStrategy,serviceRole,userservice,userroleserv,AccountLockGuard,JwtAuthGuard],
  controllers: [AuthController,usercontroller,rolecontroller,rolescontrollerForStoredProcedure],
  exports:[JwtStrategy,PassportModule, JwtModule,serviceRole,],
  
})
export class AuthModule {}


import { Roles } from '../role/role.entity';  
import { User } from '../user/user.entity';  
import { task } from '../task.entity';

import { DataSource } from "typeorm";
import { useroles } from 'src/userrole/userole.entity';
import { TaskUser } from 'src/Task_user/Task_user.Entity';
import { Groupuser } from 'src/Group-user/groupUser.entity';
import { notification } from 'src/notification/notification.entity';
import { Group } from 'src/Group-allocation/Group.entity';
import { GroupTask } from 'src/GroupTsk/GroupTask.entity';
import { Tasks } from 'src/Task-info/Task.Entity';

export const dataSource = new DataSource({
    type : 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port : parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password : process.env.DB_PASSWORD || 'Mashiloane12@',
    database : process.env.DB_DATABASE || 'task-management',
    entities:[User,Roles,useroles,TaskUser,Groupuser,notification,Group,GroupTask,Tasks],
    synchronize:false,
    logging : true,
    migrations: ['src/migration/*.ts'],
    migrationsTableName: 'typeorm_migrations',
    


});
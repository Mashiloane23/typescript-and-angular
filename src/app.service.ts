import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsEnum,  IsOptional, IsString } from 'class-validator';
import { task } from './task.entity';
import { Taskrepository } from './task.repository';
import { createTaskDTO } from './create-task.dto';
import { taskstatus } from './Task-info/task-status.enum';
import { FilterDTO } from './filter-Dto';
import { User } from './user/user.entity';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';






@Injectable()
export class AppService {

  constructor(
    
    private readonly taskrepository: Taskrepository,
    private configservice : ConfigService,
   
    private dataSource: DataSource, 
  ){}

  getDatabaseHost() {
    const dbHost = this.configservice.get<string>('DB_HOST');
    return dbHost;
  }

  async assignRolesToUser(inputUserId: number, inputRoleIds: number[]): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.startTransaction(); // Start transaction (if needed)
    try {
      // Call the stored procedure
      const res = await queryRunner.query('CALL assign_roles_to_user($1, $2)', [inputUserId, inputRoleIds]);
      
      await queryRunner.commitTransaction();  
      return 'Roles assigned successfully!';
    } catch (err) {
      await queryRunner.rollbackTransaction();  // Rollback transaction in case of error
      throw new Error('Error executing stored procedure: ' + err.message);
    } finally {
      await queryRunner.release(); // Release query runner after execution
    }
  }

  

// async createTask(createTaskDTO: createTaskDTO,user:User): Promise<task>{
//   return this.taskrepository.createTask(createTaskDTO, user);
// }

// async findTaskById (id:number, user: User):Promise<task>{
//   return this.taskrepository.findTaskByIdd(id,user);
// }
async deleteTaskById (id : number) : Promise<void>{
  return this.taskrepository.deleteTask(id);

}

async getallTask(filterDTO: FilterDTO):Promise<task[]>{
  return this.taskrepository.getAllTasks(filterDTO);
}

async GetTask (filterDTO: FilterDTO,user : User): Promise<task[]>{
  return this.taskrepository.getTasks(filterDTO,user);
}
// async updateTaskStatus(id: number, status: taskstatus): Promise<task> {
//   const update = await this.findTaskById(id); // Assume this method finds a task by ID
//   if (!update) {
//     throw new NotFoundException(`Task with ID ${id} not found`);
//   }
//   update.status = status;
//   await this.taskrepository.save(update); // TypeORM's built-in `save` method
//   return update;
// }

// async updateTaskStatus (id: number, status: taskstatus): Promise<task>{
//   const update = await this.findTaskById(id);
//   update.status = status;
//   await this.taskrepository.save(update);
//   return update;
// }

}
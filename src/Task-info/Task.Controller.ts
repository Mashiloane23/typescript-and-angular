import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { TaskService } from "./Task.service";
import { createTaskDto } from "./createTask.DTO";
import { updateTaskDto } from "./Task.UpdateDTO";
import { Tasks } from "./Task.Entity";
import { AssignTaskToUsersDto } from "./assignTaskToUsers.Dto";
import { TaskForUserDto } from "./assignTaskToUser.Dto";
import { STATUS_CODES } from "http";
import { RoleAccess, Roles } from "src/role/role.entity";
import { RolesGuard } from "src/role/roles.gaurd";
import { RolesDecorador } from "src/role/roles.decorator";
import { Taskrepository } from "src/task.repository";
import { updateTaskStatusDto } from "./UpdateTaskStatusDto";
import { TaskModule } from "./Tasks.module";

import { JwtStrategy } from "src/auth/jwt.strategy";
import { JwtAuthGuard } from "src/auth/JWT";
import { updateTask } from "./newupdatetask.dto";
import { RoleGuard } from "src/role/role.guard";
import { role } from "src/role/Role.decorator";
import { TaskFileGuard } from "src/Guards/Guards";




@Controller('Tasks')
export class TaskController{
    constructor(
        private TaskServ : TaskService,
        
    ){}

    @Post('create-Task')
    @UseGuards(JwtAuthGuard)
    async craeteTask (@Body() createDto:createTaskDto):Promise<any>{
        
            const tasks = await this.TaskServ.createTask(createDto);
            
       
    }
    
    @Get('getTaskById/:Taskid')
    @UseGuards( JwtAuthGuard)
    @role('admin')
    async getTask(@Param('Taskid',ParseIntPipe) Taskid:number, @Request() req):Promise<any>{
        
        return await this.TaskServ.GetTaskById(Taskid,  );
    }

    @Delete('delete-task/:Taskid')
    @UseGuards(JwtAuthGuard)
    async deleteTask(@Param('Taskid',ParseIntPipe) Taskid:number):Promise<string>{
        return await this.TaskServ.deleteTask(Taskid);
    }

 
@Put('updateTask')
@UseGuards(JwtAuthGuard)
async updateTask(@Body() updateTaskDto: updateTaskDto): Promise<any> {
  const updatedTask = await this.TaskServ.updateTask(updateTaskDto);
  return { message: `Changes successfully saved for taskid: ${updateTaskDto.taskid}` }; 
}




@Get('all-tasks')
@UseGuards( JwtAuthGuard)
 async getallTasks():Promise<Tasks[]>{
    return await this.TaskServ.getallTask();
}

    @Post('assignTasks')
    @UseGuards(JwtAuthGuard)
    async assignTasks(@Body() assingnTasktoUser:AssignTaskToUsersDto):Promise<string>{
        return this.TaskServ.assignTasksToUsers(assingnTasktoUser);
    }
    

    

@Get('user/:userid')
@UseGuards(JwtAuthGuard)
async getUserTasks(@Param('userid') userid: number) {
  console.log(`Fetching tasks for user ID: ${userid}`);
  return await this.TaskServ.getUserTasks(userid);
}


//update task status only
@Patch('task/:taskid/:status')
@UseGuards(JwtAuthGuard)

async updateTaskStatus(@Param('taskid',ParseIntPipe) taskid:number ,@Body() updateTaskStatusDto:updateTaskStatusDto):Promise<Tasks>{
return this.TaskServ.updateTaskStatus(taskid,updateTaskStatusDto);
}


@Put(':Taskid')

async updatetask(@Param('Taskid', ParseIntPipe) taskid:number, @Body() updateTask:updateTask, @Request() req):Promise<Tasks>{
    return this.TaskServ.updateTaskComponents(taskid,updateTask );
}
 
}
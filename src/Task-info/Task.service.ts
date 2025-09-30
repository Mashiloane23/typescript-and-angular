import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from "typeorm";
import { createTaskDto } from "./createTask.DTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Tasks } from "./Task.Entity";
import { updateTaskDto } from "./Task.UpdateDTO";
import { User } from "src/user/user.entity";
import { identity } from "rxjs";
import { AssignTaskToUsersDto } from "./assignTaskToUsers.Dto";
import { TaskUser } from "src/Task_user/Task_user.Entity";
import { TaskForUserDto } from "./assignTaskToUser.Dto";
import { task } from "src/task.entity";
import { ApiGatewayTimeoutResponse } from '@nestjs/swagger';
import { taskstatus } from 'src/Task-info/task-status.enum';
import { updateTaskStatusDto } from './UpdateTaskStatusDto';
import { updateTask } from './newupdatetask.dto';
// import { EmailService } from 'src/Email/Email.service';

@Injectable()
export class TaskService{

    private readonly loggers = new Logger(TaskService.name);
    constructor (
        @InjectRepository(Tasks)
        private Taskrepo :Repository<Tasks>,
        

        @InjectRepository(User)
        private userRepo :Repository<User>,

        @InjectRepository(TaskUser)
        private taskUserRepo :Repository<TaskUser>,

        // private readonly service:EmailService,

        


    ){}

    

    async createTask(createTaskDto: createTaskDto): Promise<{ message: string }> {
    this.loggers.log(`Creating task for user`);

    console.log(`Received task:`, createTaskDto);

    const dueDate = new Date(createTaskDto.DueDate);

    const { taskname, description} = createTaskDto; 

    const newtask = this.Taskrepo.create({taskname,description,DueDate:dueDate});

    // const newTask = this.Taskrepo.create({ taskname, description,dueDate});
    await this.Taskrepo.save(newtask);

    return { message: `Task ${taskname} has been created successfully` }; 
}


    async deleteTask(Taskid:number):Promise<string>{
        const delTask = await this.Taskrepo.delete(Taskid);

        if ( delTask.affected === 0){
            throw new NotFoundException ("the taskid doesn't exist")
        }
        return ` the task with taskid of :${delTask} is succesfully deleted`
    }

    async Taskdel(Taskid:number):Promise<string>{
        
        const deleteTask = await this.Taskrepo.delete(Taskid);

        if(deleteTask.affected ===0){
            throw new NotFoundException("the task is not found");
        }

        return `Task successfully deleted`;
    }

    async GetTaskById(taskid:number):Promise<any>{
        const getTask = await this.Taskrepo.findOne({where:{taskid}});

        if(!getTask){
            throw new NotFoundException(`the task with taskid of ${taskid} is nor found`);

        }

        

        return getTask;
    }

    async updateTask(updateTask: updateTaskDto): Promise<string> {
        const { taskid, taskname, description, taskstatus } = updateTask;
    
        // Step 1: Find the task using taskid
        const checkTask = await this.Taskrepo.findOne({ where: { taskid } });
    
        this.loggers.log(`The task is about to be updated`);
    
        if (!checkTask) {
            this.loggers.log(`The task does not exist`);
            throw new NotFoundException(`The task with taskid: ${taskid} does not exist`);
        }
    
        let isUpdated = false;
    
        
        if (taskname !== undefined && taskname !== checkTask.taskname) {
            const existingTask = await this.Taskrepo.findOne({ where: { taskname } });
            if (existingTask && existingTask.taskid !== taskid) {
                throw new ConflictException(`Task name '${taskname}' already exists.`);
            }
            checkTask.taskname = taskname;
            isUpdated = true;
        }
    
        if (description !== undefined && description !== checkTask.description) {
            checkTask.description = description;
            isUpdated = true;
        }
    
        if (taskstatus !== undefined && taskstatus !== checkTask.taskstatus) {
            checkTask.taskstatus = taskstatus;
            isUpdated = true;
        }
    
        if (!isUpdated) {
            this.loggers.log(`No changes detected for taskid: ${taskid}`);
            return `No updates were made to taskid: ${taskid}`;
        }
    
        
        await this.Taskrepo.save(checkTask);
        this.loggers.log(`Task successfully updated`);
    
        return `Changes successfully saved for taskid: ${taskid}`;
    }


    async updateTaskComponents(taskid:number, updatetask:updateTask):Promise<Tasks>{

        const taskidd = await this.Taskrepo.findOne({where:{taskid}});

        if(!taskidd){
            throw new NotFoundException('taskID not found');
        }

        Object.assign(taskidd,updatetask);

        await this.Taskrepo.save(taskidd);
        return taskidd;
    }
    
    
    
    

    async getallTask():Promise<Tasks[]>{
        return await this.Taskrepo.find();
    }

    async assignTasksToUsers(assignTaks: AssignTaskToUsersDto): Promise<string> {
        const { userid, taskid } = assignTaks;
    
        // Check if the task exists in DB 
        const checkTask = await this.Taskrepo.findOne({ where: { taskid } });
        if (!checkTask) {
            throw new NotFoundException(`The Task with ID ${taskid} does not exist`);
        }
    
        
        const checkUsers = await this.userRepo.find({
            where: userid.map((id) => ({ userid: id })),
        });
        if (checkUsers.length !== userid.length) {
            throw new NotFoundException(`One or more user IDs do not exist`);
        }
    
        
        const existingAssignment = await this.taskUserRepo.find({
            where: userid.map((id) => ({
                user: { userid: id },
                task: { taskid },
            })),
        });
    
        if (existingAssignment.length > 0) {
            const alreadyAssignedUserIds = existingAssignment.map((assign) => assign.user?.userid).filter((userid)=>userid !==undefined);
            throw new ConflictException(
                `Task with ID ${taskid} is already assigned to the following users: ${alreadyAssignedUserIds.join(', ')}`
            );
        }
    
        
        const newAssignments = checkUsers.map((user) => this.taskUserRepo.create({ task: checkTask, user }));
        await this.taskUserRepo.save(newAssignments);

        

        

        
    
        return `The task with ID ${taskid} has been successfully assigned to users: ${checkUsers
            .map((user) => user.userid)
            .join(', ')}`;
    }
    
    async createTaskForUser(TaskForUserDtos:TaskForUserDto):Promise<string>{

        const {userid,taskid,taskDescription} = TaskForUserDtos;

        const getuser = await this.userRepo.findOne({where:{userid}});

        if(!getuser){
            throw new NotFoundException('the user is not found');
        }

        const getTask = await this.Taskrepo.findOne({where:{taskid}});
        if(!getTask){
            throw new NotFoundException('the Task is not found');
        }

        

        const ford = new TaskUser();
        ford.task = getTask;
        ford.user = getuser;

        

        await this.taskUserRepo.save(ford);

        return `Task with Id of :${taskid} has been successfully asigned to a user of userid:${userid}`

    }

   

    
    


    


async getUserTasks(userid: number): Promise<Tasks[]> {
    try {
      const userTasks = await this.taskUserRepo.find({
        where: { user: { userid } }, 
        relations: ['task'],
      });
  
      if (!userTasks || userTasks.length === 0) {
        console.log(`No tasks found for user ID: ${userid}`);
        return [];
      }
  
      return userTasks.map((taskUser) => taskUser.task);
    } catch (error) {
      console.error('Error retrieving user tasks:', error.message || error);
      throw new InternalServerErrorException('Failed to retrieve tasks.');
    }
  }
  
  async updateTaskStatus(taskid:number,updateTaskDto:updateTaskStatusDto):Promise<Tasks>{
    const taskupdate = await this.Taskrepo.findOne({where:{taskid}});

    if(!taskupdate){
        throw new NotFoundException(`Task is not found`);
    }
    taskupdate.taskstatus = updateTaskDto.status;

    return this.Taskrepo.save(taskupdate);
  }


 


    

    
}
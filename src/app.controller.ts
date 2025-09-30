import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { task } from './task.entity';
import { createTaskDTO } from './create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { Getuser } from './auth/get-user.dec';
import { User } from './user/user.entity';
import { FilterDTO } from './filter-Dto';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';




@Controller('task')
@UseGuards(AuthGuard())
export class AppController {
  private logger = new Logger('TASKCONTROLLER');
  constructor(
    
    private readonly appService: AppService,
    private configserv : ConfigService,
    
  ){
    
    // const testValue = this.configserv.get<string>('test_value');
    // this.logger.log(`test_value: ${testValue}`);
    

  }
  
   

  // Call the createTask method in the service
  // @Post()
  // async createTask(@Body() createTaskDTO: createTaskDTO,
  // @Getuser() user: User): Promise<task> {
  //   this.logger.verbose(`user "${user.username}" creating a new task. data ${JSON.stringify(createTaskDTO)}`);
  //   return this.appService.createTask(createTaskDTO, user); 
  // }
 


  // @Get(':id')
  // async findTaskByIdd(@Param('id') id:number,@Getuser() user: User): Promise<task>{
  //   return this.appService.findTaskById(id,user);
  // }
  @Delete()
  async deleteTaskById(@Param('id') id: number): Promise<void> {
    await this.appService.deleteTaskById(id); // Use `await` since the service returns a Promise<void>
  }
  @Get()
  async getallTask(@Query() filterDTO: FilterDTO, @Getuser() user :User): Promise<task[]> {
    this.logger.verbose(`user "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filterDTO)}`);
    // Corrected to call the service method for getting tasks based on filter
    return this.appService.getallTask(filterDTO);
  }
  @Get(':all')
  async getTasks(@Query() filterDTO: FilterDTO,user:User): Promise<task[]> {
    this.logger.verbose('Retrieving tasks with filters');
    return this.appService.GetTask(filterDTO,user); // Pass the DTO to the service
  }

  @Post('assign')
  async assignRoles(@Body() body: { userId: number; roleIds: number[] }): Promise<string> {
    const { userId, roleIds } = body;
    return this.appService.assignRolesToUser(userId, roleIds);
  }

  // @Patch()
  // updateTaskStatus (@Param('id')id :string ,@Body() updateTaskSTatus : updateTask)

 
}
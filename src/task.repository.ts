import { EntityRepository, Repository } from "typeorm";
import { task } from "./task.entity";
import { createTaskDTO } from "./create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, InternalServerErrorException, NotFoundException, Search } from "@nestjs/common";
import { taskstatus } from "./Task-info/task-status.enum";
import { FilterDTO } from "./filter-Dto";
import { User } from "./user/user.entity";
import { Logger } from "@nestjs/common";

@Injectable() // Ensure Taskrepository is Injectable
export class Taskrepository {
    private logger = new Logger('TaskRepository');
    constructor(
        @InjectRepository(task) // Inject the task repository
        private readonly taskRepository: Repository<task>, // Standard repository
    ) { }





    // async createTask(createTaskDTO: createTaskDTO, user: User): Promise<task> {
    //     const { tittle, description,status } = createTaskDTO;

    //     // Use the repository's create method to create a task instance
    //     const newTask = this.taskRepository.create({
    //         tittle,
    //         description,
    //         status:status || taskstatus.OPEN,
    //         user,
    //     });


    //     // Save the new task to the database
    //     await this.taskRepository.save(newTask);
    //     return newTask;
    // }
    //getTask methods using query method 
    async getTasks(filterDTO: FilterDTO, user: User): Promise<task[]> {
        const { search, status } = filterDTO;
        const query = this.taskRepository.createQueryBuilder('task');

        if (search) {
            query.andWhere('task.name LIKE :search', { search: `%${search}%` });
        }

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        try {
            return await query.getMany();
        } catch (error) {
            this.logger.error(`failed to get the task for user "${user.username}".filters: ${JSON.stringify(filterDTO)}` );
            throw new InternalServerErrorException('not found');
        }


    }

    // findTask using ID method
    // async findTaskByIdd(id: number, user: User): Promise<task> {
    //     const found = await this.taskRepository.findOne({
    //         where: { id, user },
    //     });
    //     if (!found) {
    //         throw new NotFoundException('TASK NOT FOUND');
    //     } else {
    //         return found;
    //     }
    // }
    // delete meytghod using ID 
    async deleteTask(id: number): Promise<void> {
        const del = await this.taskRepository.delete(id);
        if (del.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

    }


    //   async createTaskWithFilters(filterDTO: FilterDTO): Promise<task> {
    //     const { status, search } = filterDTO;

    //     // Create a new task instance
    //     const task = new Task();
    //     task.status = status || 'OPEN';
    //     task.description = search || 'Default Description';

    //     // Save the new task to the database
    //     return this.taskRepository.save(task);
    //   }
    async getAllTasks(filterDTO: FilterDTO): Promise<task[]> {
        const { status, search } = filterDTO;

        const query = this.taskRepository.createQueryBuilder('task');

        // Apply filters based on status
        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        // Apply search filter
        if (search) {
            query.andWhere('task.description LIKE :search', { search: `%${search}%` });
        }

        // Fetch tasks using the built query
        const tasks = await query.getMany();
        return tasks;
    }
}


//   async updateTaskStatus (id: number, status: taskstatus): Promise<task>{
//   const update = await this.findTaskById(id);
//   update.status = status;
//   await this.taskrepository.save(update);
//   return update;
//
//   async findstatus(status:string): Promise<task[]>{
//     const statuses =await this.taskRepository.find({where: {status } });
//     return statuses;
//   }



import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tasks } from "./Task.Entity";  // Assuming this is your entity
import { updateTaskDto } from "./Task.UpdateDTO"; // The DTO for the update
import { NotFoundException } from "@nestjs/common";

export class taskservice {
    constructor(
        @InjectRepository(Tasks)
        private taskrepo: Repository<Tasks>  // Inject repository for database operations
    ) {}

    // Update task method
    async update(taskid: number, updateTaskDto: updateTaskDto): Promise<Tasks> {
        // Find the task by taskid
        const task = await this.taskrepo.findOne({ where: { taskid } });

        // If the task does not exist, throw a NotFoundException
        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Update the task with the new data (only fields that are provided)
        for (const key in updateTaskDto) {
            if (updateTaskDto[key] !== undefined) {
                task[key] = updateTaskDto[key];  // Update the task with the new values
            }
        }

        // Save the updated task back to the database
        return this.taskrepo.save(task);
    }
}
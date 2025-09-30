import { InjectRepository } from "@nestjs/typeorm";
import { Group } from "./Group.entity";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Groupuser } from "src/Group-user/groupUser.entity";
import { GroupAllocatioNDto } from "./GroupAllocation.Dto";
import { Taskrepository } from "src/task.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Tasks } from "src/Task-info/Task.Entity";
import { GroupTask } from "src/GroupTsk/GroupTask.entity";
import { task } from "src/task.entity";

@Injectable()
export class GroupService{
    constructor (

        @InjectRepository (Group) 
        private Groupserv :Repository<Group>,
        @InjectRepository(User)
        private userServ: Repository<User>,
        @InjectRepository(Groupuser)
        private Groupuserserv: Repository<Groupuser>,
        // @InjectRepository(Taskrepository)
        // private taskrep : Repository<Taskrepository>,
        @InjectRepository(Tasks)
        private taskrepos:Repository<Tasks>,

        @InjectRepository(GroupTask)
        private GroupTask : Repository<GroupTask>,

        
    ){}

    async createGroup(groupDto:GroupAllocatioNDto):Promise<string>{
        const {Groupname,description,User,taskid} = groupDto;

        const checkGroup = await this.Groupserv.findOne({where:{groupname:Groupname}});

        if(checkGroup){
            throw new Error(`the groupname of "${Groupname} exist in the database"`);
        }

        const createGroup = await this.Groupserv.create({groupname:Groupname,description});

        const saves = await this.Groupserv.save(createGroup); 
        
        const taskExist = await this.taskrepos.findOne({where:{taskid:taskid}});

        if(!taskExist){
            throw new NotFoundException('the Task doesnot exist');
            
        }

        
        const grouptask = this.GroupTask.create({
            task:taskExist,
            group:saves,
        });

        await this.GroupTask.save(grouptask);

        
        if (User.length > 0){
            const users = await this.userServ.find({where:User.map((id)=> ({userid:id})),});
        
            if (users.length !== User.length){
                throw new Error('some users dont exist')
            }

            const groupuser = users.map((user) => {
                return this.Groupuserserv.create({group:saves,user});
            });

            await this.Groupuserserv.save(groupuser);
        
        }
        
        

        return `group of users have been successfully created with a groupname of 
        ${saves.groupname}`
        

       
    }

    

    
}
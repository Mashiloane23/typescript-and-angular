import { 
    BadRequestException, 
    Injectable, 
    InternalServerErrorException, 
    Logger, 
    NotFoundException 
} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/auth/userrepo";
import { Roles, UserRole } from "src/role/role.entity";
import { DataSource, Repository } from "typeorm";
import { useroles } from "src/userrole/userole.entity";
import { application } from "express";
import { updateDto } from "./update.DTO";
import { assignrole } from "./assign.DTO";
import { assignroletouserDTO } from "src/role/role-assign";
import { error } from "console";
import { use } from 'passport';
import { TaskUser } from 'src/Task_user/Task_user.Entity';

@Injectable()
export class userservice{

    private readonly logger = new Logger(userservice.name);
    constructor(
        @InjectRepository(User)
       private userRepository: Repository<User>,

       @InjectRepository(Roles)
       private rolerepository:Repository<Roles>,

       @InjectRepository(useroles)
       private userolerepo: Repository<useroles>,

       @InjectRepository(TaskUser)
       private taskuser:Repository<TaskUser>,

       private datasource:DataSource
    ){}


    
    // async getuserbyidandrole(userid:number):Promise<string>{
    //     this.logger.log(`getting a user with an Id of :${userid}`);
    //     const getu = await this.userRepository.findOne({where:{userid}});
    //     if(!getu){
    //         this.logger.error(`the user with: ${getu} doesnot exist` )
    //         throw new NotFoundException("USER NOT FOUND");
    //     }
        
    //     return `user is found with userid of:${userid} and username of ${getu.username}`;
    // }


    
    //get all users
    async getallcust():Promise<{id:number,username:string}[]>{
        const rh = await this.userRepository.find();
        
        return rh.map(rh => ({
            id:rh.userid,
            username:rh.username,
        }));
    }


   //deleting a user from the database 
    async deleteuser(userid:number):Promise<string>{

        this.logger.log(`Attempting to delete user with ID of:${userid}`);
        const deluser = await this.userRepository.delete(userid);

        

        if(deluser.affected === 0){

            const erormessage =`userid of ${userid} is not found `;
            this.logger.warn(erormessage)
            throw new NotFoundException(`user with userid of :${userid} is not found`);
        }

        this.logger.log(`user with userid of ${userid} is deleted successfully`);
        return `user with userid of ${userid} is deleted`


    }

    // updating Data using userrname

    async updateUser(updadatedtos:updateDto):Promise<string>{

        const {userid,username,lastname,firstname,Email} = updadatedtos;
        const usersss = await this.userRepository.findOne({where:{userid}});
        
        if(!usersss){
            throw new NotFoundException(`user with id of ${userid} doesn't exist`);
        }

        let isUpdated = false;

        if(username && username !== usersss.username){
            usersss.username = username;
            isUpdated =true;
            
        }
        if(lastname && lastname !== usersss.lastname){
            usersss.lastname = lastname;
            isUpdated =true;
        }
        if(firstname && firstname !== usersss.firstname){
            usersss.firstname = firstname;
            isUpdated =true;
        }

        if(Email !== usersss.Email){
            usersss.Email = Email;
            isUpdated = true;
        }

        
       if(isUpdated){
        await this.userRepository.save(usersss);
        return `update successfully made for ${userid}`;
       }
    }

    async getuserbyid(userid:number):Promise<string>{

        this.logger.log(`searching for user with ID of:${userid}`);
        const getuser = await this.userRepository.findOne({where:{userid}});

        if(!getuser){
            this.logger.warn(`the user with: ${getuser} doesnot exist` )
            throw new NotFoundException('the user is not found');
        }
        this.logger.log(`the user with Id OF :${userid} is found`)
        return `the user id is:${getuser.userid} and has a lastname of:${getuser.lastname} and a firstname of:${getuser.firstname}
         and username of ${getuser.username}`;
    }

    async assignrole(assign:assignrole):Promise<string>{
        const {userid,roleids} = assign;

        const userss = await this.userRepository.findOne({where:{userid},relations:['userRoles']});

        if(!userss){
            throw new NotFoundException(`userid ${userid} is not found`);
        }

        const roless = await this.rolerepository.find({where : roleids.map((id) => ({roleid:id,isSoftDel:false}))});

        if(roless.length !== roleids.length){
            throw new NotFoundException(`role id of ${roleids} is not found`);
        }

        const existingTask = await this.userolerepo.find({where:roleids.map((id)=>({user:{userid},role:{roleid:id}})
        
        )});

        if(existingTask.length >0){
            throw new BadRequestException(`User ID of: ${userid} is already assigned the role `)
        }

        const userrole = roless.map((role) => this.userolerepo.create({user:userss,role}));

        await this.userolerepo.save(userrole);

        return `roles successfully assigned to id of ${userid}`;
    
    }

    async getTaskUsingUsername(username:string){
        
        const user = await this.userRepository.findOne({where:{username}});

        if (!user){
            throw new NotFoundException(`the username of ${user} doesnot exist`);
        }

        const taskuser = await this.taskuser.find({where:{user:user}});

        return taskuser.map((taskuser)=>taskuser.task)


    }


   
    
      

    


   


    





}
import { Repository } from "typeorm"
import { RoleAccess, Roles } from "./role.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { UserRole } from "./role.entity";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException,BadRequestException, ForbiddenException } from "@nestjs/common";
import { exit } from "process";
import { RoleCreateDto } from "./role-create.DTO";
import { JwtService } from "@nestjs/jwt";
import { roleDTO } from "./role.DTO";
import { softdelDTO } from "./softdelete.DTO";
import { gerolebyidDTO } from "./getrole.DTO";
import { RoleUpdateDto } from "./role-update.DTO";
import {  assignroletouserDTO } from "./role-assign";
import { useroles } from "src/userrole/userole.entity";
import { observable } from "rxjs";


@Injectable()
export class serviceRole{

    constructor(
        
        @InjectRepository(Roles)
        private Rolerepo: Repository<Roles>,

        @InjectRepository(User)
        private userrepo: Repository<User>,

        @InjectRepository(useroles)
        private userolerepo : Repository<useroles>,

        private JwtService :JwtService,
    ){}

    async softdelete(softdeldto:softdelDTO):Promise<string>{
        
        const {roleid} = softdeldto;
        try{
            const userss = await this.Rolerepo.findOne({where:{roleid,isSoftDel:false}})

            if(!userss){
                throw new NotFoundException('role not found');
            }


            userss.isSoftDel = true;

            await this.Rolerepo.save(userss);

            return `role succefully softdeleted ${roleid}`
        }
        catch(error){
            throw new InternalServerErrorException('failed to softdelete the role ')
        }
        
    }

    async rolecreate(dto:RoleCreateDto):Promise<string>{
        const {rolename:RoleAccess,description,roleType} = dto;

        

        const checkroles = roleType.toLocaleLowerCase() as UserRole;

        const createrole = await this.Rolerepo.create({
            roleType:checkroles,
            rolename:RoleAccess,
            description,
        })

        

        await this.Rolerepo.save(createrole);

        return 'role created successfully';
    }
    
    
    
    
    
    

    async update(updatedto: RoleUpdateDto, userRole: RoleAccess): Promise<string> {
        if (userRole !== RoleAccess.Admin) {
            throw new ForbiddenException('Only admin can access this method');
        }
    
        const { roleid, rolename, roleType, description } = updatedto;
    
        const updates = await this.Rolerepo.findOne({ where: { roleid } });
    
        if (!updates) {
            throw new NotFoundException(`The role ID doesn't exist: ${roleid}`);
        }

        if (rolename && !Object.values(RoleAccess).includes(rolename as RoleAccess)){

            throw new BadRequestException(`Invalid rolename :${rolename} please provide valid role`)
        }
        if (roleType && !Object.values(UserRole).includes(roleType as UserRole)){
            throw new BadRequestException(`Invalid roletype :${roleType} `);
        }
    
        if (rolename) {
            updates.rolename = rolename as RoleAccess;
        }
    
        if (roleType) {  
            updates.roleType = roleType as UserRole;  
        }
    
        if (description) {
            updates.description = description;
        }
    
        await this.Rolerepo.save(updates);
    
        return 'Successfully updated';
    }
    

    

    async getall():Promise<any[]>{

        const getall = await this.Rolerepo.find({where:{isSoftDel:false}});

        if(!getall){
            throw new NotFoundException('no role is found');
        }
        return getall;
    }

    async getrols(roleid:number):Promise<string>{

        const getrole = await this.Rolerepo.findOne({where:{roleid,isSoftDel:false}});
        if(!getrole){
            throw new NotFoundException(`THE ROLE ID ${roleid} doesn't exist `);
        }

        return `role id exist ${roleid} has a roletype of ${getrole.roleType} and a rolename of ${getrole.rolename} and is it softdeleted ${getrole.isSoftDel}`
    }

    async asignroletousers(assignrole:assignroletouserDTO):Promise<string>{
        const {roleid,userid} = assignrole;

        const roleids = await this.Rolerepo.findOne({where:{roleid,isSoftDel:false},relations:['userRole']});

        if(!roleids){
            throw new NotFoundException(`roleid is not found ${roleid}`)
        }

        const userd = await this.userrepo.find({where : userid.map((id) => ({userid:id}))});

        if (userd.length !== userid.length ){
            throw new NotFoundException (`the useid ${userd} is not found`);

        }


        const roleforusers = userd.map((users) => this.userolerepo.create({role:roleids,user:users}))

        await this.userolerepo.save(roleforusers);

        return `the role is assigned to users successfully `;

    }


}
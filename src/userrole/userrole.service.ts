import { Injectable, Inject, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';

import { User } from "src/user/user.entity"
import { Roles } from "src/role/role.entity"
import { DataSource, Repository } from "typeorm"
import { InjectRepository } from '@nestjs/typeorm';
import { useroles } from "./userole.entity";
import { usroleDTO } from "./USEROLE.DTO";
import { assignrolestouser } from "./assignRoleToUser.DTO";
import { assign_users_role } from "./assignUsersRoles.DTO";


@Injectable()
export class userroleserv{
    constructor(
        
        @InjectRepository(Roles)
        private Rolerepo: Repository<Roles>,

        @InjectRepository(User)
        private userrepo: Repository<User>,

        @InjectRepository(useroles)
       private userolerepo: Repository<useroles>,

       private datasource:DataSource,
    ){}
    
    

    async assignRolesToUser(assign_Roles: assignrolestouser): Promise<string> {
        const query_method = `CALL assign_roles_to_user($1, $2)`;
    
        try {
            console.log('Executing procedure with params:', assign_Roles);
    
            const userid = assign_Roles.userid;
            const roleids = assign_Roles.roleid;
    
            if (!Array.isArray(roleids)) {
                throw new Error('roleid should be in an array');
            }
    
            
            const roleidsFormatted = `{${roleids.join(',')}}`;
    
            console.log('Formatted roleids:', roleidsFormatted);
    
            
            await this.datasource.query(query_method, [userid, roleidsFormatted]);
    
            return 'Roles successfully assigned to user';
        } catch (error) {
            console.error('Query failed:', error.message);
    
            throw new InternalServerErrorException('Failed to assign roles');
        }
    }
    async assignUsersToRole(assign_users:assign_users_role):Promise<string>{
        const query_call = `CALL assign_userss_role($1,$2)`;


        try{
            console.log('Executing procedure with params:', assign_users); 
            const roleid = assign_users.roleid;
            const userids= assign_users.userid;

            if(!Array.isArray(userids)){
                throw new Error('userid must be in an array form');
            }

            const useridformat = `{${userids.join(',')}}`;
            console.log('Formatted user IDs:', useridformat);
            console.log('Role ID:', roleid);

            await this.datasource.query(query_call,[roleid,useridformat]);

            return 'users are assigned to role';

        
        }catch(error){

            console.error('Error while assigning users to role:', error.message);
            throw new InternalServerErrorException('failed to assign users ');
        }

    }
    
    
    


}
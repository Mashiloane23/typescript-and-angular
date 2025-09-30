import { Body, Controller, Param, Post } from "@nestjs/common";
import { userroleserv } from "./userrole.service";
import { usroleDTO } from "./USEROLE.DTO";
import { assignrole } from "src/user/assign.DTO";
import { assignroletouserDTO } from "src/role/role-assign";
import { assignrolestouser } from "./assignRoleToUser.DTO";
import { assign_users_role } from "./assignUsersRoles.DTO";


@Controller('user')
export class rolescontrollerForStoredProcedure{
    constructor(
        private userrolserv : userroleserv
    ){}

    // @Post('role/:roleid/user/:userid')
    // async createroleidanduserid(@Body() useroleDto:usroleDTO ):Promise<string>{
    //     const {roleid,userid} = useroleDto;
    //     return this.userrolserv.assignroletouser(useroleDto);
    // }

    @Post('assign-roles')
    async assignRoleInStored(@Body() assignroles:assignrolestouser):Promise<string>{
        return this.userrolserv.assignRolesToUser(assignroles);
    }

    @Post('assign_Users_Roles')
    async assignusers(@Body() assignusers:assign_users_role):Promise<string>{
        return this.userrolserv.assignUsersToRole(assignusers);
    }

    
}
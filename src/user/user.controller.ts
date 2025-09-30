import { Controller, Delete, Get, NotFoundException, Param,BadRequestException, Post, Patch, Body, Put, UseFilters, UseGuards, HttpException, HttpStatus } from "@nestjs/common";
import { userservice } from "./user.service";
import { UserRole } from "src/role/role.entity";
import { error } from "console";
import { User } from "src/user/user.entity";
import { updateDto } from "./update.DTO";
import { assignrole } from "./assign.DTO";
import { assignroletouserDTO } from "src/role/role-assign";
import { HttpErrorFilter } from "src/Http-error.filter";



@Controller('user')
export class usercontroller{
    constructor(
        private service: userservice,
    ){}

   
    // @Post('user/:userid/:role/:roleType/rolename/:rolename/description/:description')
    // async users(@Param('roleType')roleType:UserRole,
    //            @Param('rolename')rolename:string,@Param('description')
    //             description:string,@Param('userid')userid:number):Promise<string>{
        // if (!Object.values(UserRole).includes(roleType)) {
        //     throw new BadRequestException(
        //       `Invalid roleType: '${roleType}'. Role type must be either 'system' or 'application'.`
        //     );
        //   }
        
    //     return this.service.getuserbyidandrole(userid,roleType)
    // }

    @Get('allUsers')
    @UseFilters(HttpErrorFilter)
    @UseGuards()
    async getallusers():Promise<{id:number,username:string}[]>{
        const th= this.service.getallcust();
        return th;
    
    }

    @Delete('user/:userid')
    async deleteusers(@Param('userid')userid:number): Promise<string>{
        throw new HttpException('Forbiden',HttpStatus.FORBIDDEN);
        return this.service.deleteuser(userid);
    }

    
    @Put('updateUsers')
    async updateuser(@Body() updateDtos:updateDto):Promise<string>{
        return this.service.updateUser(updateDtos);

    }

    @Get('user/:userid')
    async getuserbyid(@Param('userid') userid:number):Promise<string>{
        return this.service.getuserbyid(userid);
    }

    @Post('assignrole')
    async assignrole(@Body() assignroles : assignrole):Promise<string>{
        return this.service.assignrole(assignroles);
    }

    @Get(':username')
    async getataskUsingUsername(@Param('username') username:string){
        return this.service.getTaskUsingUsername(username);
    }

   
    


    // @Get('user/:userid')
    // async getuser(@Param('userid')userid:number,@Param('roleType')roleType:UserRole):Promise<string>{
    //     return this.service.getuserbyid(userid,roleType);
    // }


   
    // @Delete('user/:userid')
    // async deleteuser(@Param('userid')userid:number):Promise<string>{
    //     return this.service.deleteuser(userid);
    // }
}
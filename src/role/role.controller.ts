import { Injectable, InternalServerErrorException, NotFoundException, ConflictException,Logger,ValidationPipe, Body, Controller, Delete, Param, Post, BadRequestException,Get,Put,ParseIntPipe, UseGuards, RequestMapping, Request, HttpException, HttpStatus } from '@nestjs/common';import { serviceRole } from "./role.service";
import { RoleAccess, Roles, UserRole } from "./role.entity";

import { softdelDTO } from "./softdelete.DTO";
import { gerolebyidDTO } from "./getrole.DTO";
import { RoleUpdateDto } from "./role-update.DTO";
import { assignroletouserDTO } from "./role-assign";
import { RoleCreateDto } from "./role-create.DTO";
import { RolesDecorador } from './roles.decorator';
import { RolesGuard } from './roles.gaurd';

import { useroles } from 'src/userrole/userole.entity';
import { Getuser } from 'src/auth/get-user.dec';

@Controller('role')
export class rolecontroller{
    constructor(private servicrole:serviceRole){}
   
    @Delete('roleid')
    async softdel(@Body() softdeDto:softdelDTO):Promise<string>{
        const {roleid} = softdeDto;
            return await this.servicrole.softdelete(softdeDto);
       
    }

    // @Post('create')
    // @RolesDecorador(RoleAccess.Admin)
    // @UseGuards(RolesGuard)
    // async createRole(@Body() dto:RoleCreateDto,@Getuser('role') useroles:RoleAccess):Promise<string>{
    //   return this.servicrole.createRole(dto,useroles);

    // }

   
    @Post('create')
    async createrole(@Body() dto:RoleCreateDto):Promise<{message:string}>{
      try{
        
        await this.servicrole.rolecreate(dto);
        console.log('role successfully created ');

        return {message:'role created successfully'};
      }catch(error){
        console.error('role creation failed',error);
        throw new HttpException(
          {message:'role creation failed'},
          HttpStatus.BAD_REQUEST
        );
      }
    }

    

    @Post('update')
    
    async updateRole(@Body() dto:RoleUpdateDto , @Request() req:any){

      const userole = req.user.role;
      return this.servicrole.update(dto,userole);
    }

    

    
    @Get('allroles')
    async getroless():Promise<any[]>{
      return await this.servicrole.getall();
    }
    
    @Get('roleid/:roleid')
    
async getrole(@Param('roleid') roleid: string): Promise<string> {
  // Parse roleid to an integer
  const parseRoleId = parseInt(roleid, 10); // Convert from string to integer
  if (isNaN(parseRoleId)) {
    throw new BadRequestException('Invalid roleid. It must be an integer.');
  }

  return await this.servicrole.getrols(parseRoleId);
}

    
    @Get('user')
    async asignrole(@Body() getuers:assignroletouserDTO):Promise<string>{
      return await this.servicrole.asignroletousers(getuers);
    }

}

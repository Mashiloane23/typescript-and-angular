import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthCredDto } from './auth.credantial.Dto/auth.cred.Dto';
import { AuthService } from './auth.service';
import { serviceRole } from 'src/role/role.service';
import { UserRole } from 'src/role/role.entity';
import { Getuser } from './get-user.dec';
import { User } from '../user/user.entity';
import { use } from 'passport';
import { authCredSigninDto, signupDTO } from './auth.credantial.Dto/auth.signupDto';
import { TaskService } from 'src/Task-info/Task.service';
import { Tasks } from 'src/Task-info/Task.Entity';
import { JwtAuthGuard } from './JWT';
import { AccountLockGuard } from './Canactivate';

@Controller('auth')
export class AuthController {

    constructor(private authservice : AuthService,
        private servicrole:serviceRole,

        private taskservice:TaskService,
    ){}




    @Post('/signup')
    signUp(@Body() AuthCredDtO: signupDTO) : Promise<void>{
        return this.authservice.createUser(AuthCredDtO);


    }
    
    @Post('/signin')
    async signin(@Body() authCredDTO: AuthCredDto): Promise<{ accessToken: string,rolename:string,tasks:Tasks[] }> {
        try {
            const result = await this.authservice.signIn(authCredDTO);
      
            if (!result) {
                throw new UnauthorizedException('Invalid login details');
            }

            const tasks = await this.taskservice.getUserTasks(result.userid);
      
            return {
                accessToken:result.accessToken,
                rolename:result.rolename,
                tasks:tasks,
            }
        } catch (error) {
            console.error('SignIn Controller Error:', error);
            throw error;
        }
    }
    @Post('/reset')
    async reset(@Body('targetUsername') targetUsername: string, @Req() req:any ){

        const requestingUserId = req.user.userid;

        return this.authservice.unlockUsers(targetUsername,requestingUserId);
    }

    @Post('/creatingSuperUser')
    async newSuper(@Body('username') username:string, @Req() req:any){
        const requestingUserIds = req.user.userid;

        return this.authservice.makeSuperUser(username,requestingUserIds);
    }
}

    



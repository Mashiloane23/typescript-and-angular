import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredDto } from './auth.credantial.Dto/auth.cred.Dto';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRole } from 'src/role/role.entity';
import * as Bcrypt from 'bcryptjs'

import { jwtpayload } from "./auth.credantial.Dto/jwt-payload.interface"; 
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UserRepository } from './userrepo';
import { authCredSigninDto, signupDTO } from './auth.credantial.Dto/auth.signupDto';
import { Tasks } from 'src/Task-info/Task.Entity';
import { TaskUser } from 'src/Task_user/Task_user.Entity';
import { task } from 'src/task.entity';
import { useroles } from 'src/userrole/userole.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        
        private userRepository: UserRepository,
        private JwtService :JwtService,
        @InjectRepository(Tasks)
        private taskReP:Repository<Tasks>,
        @InjectRepository(TaskUser)
        private taskuser:Repository<TaskUser>,
        @InjectRepository(useroles)
        private userrole:Repository<useroles>
    ){}


    

    async createUser(authcredDto: signupDTO): Promise<void>{

        const {firstname,lastname,username,password,Email} = authcredDto;

        const getusername = await this.userRepository.findOne({where:{username}});

        if(getusername){
          throw new ConflictException("username already exist please try new username");
        }

        console.log("new user successfully created");
        
        
        const salt = await Bcrypt.genSalt();
        const hashedPassword = await Bcrypt.hash(password, salt);

        const checkEmail = await this.userRepository.findOne({where:{Email}});

        if(checkEmail){
          throw new ConflictException("the email is already registered to one account")
        }

       
        const userr = await this.userRepository.create({
            firstname,
            lastname,
            username,
            Email,
            password : hashedPassword,
            loginAttempts:0,
            disableuntil:null
        })

        try{
            await this.userRepository.save(userr);
            
        } catch(error){

        if (error.code === 23505){
            
        }else{
            
            throw new InternalServerErrorException(' ');
        }
            
        };

        
     }
    
     async signIn(authcredDto: AuthCredDto): Promise<{ accessToken: string; rolename: string; userid: number; username: string }> {
  const { username, password } = authcredDto;

  const user = await this.userRepository.findOne({
    where: { username },
    relations: ['userRoles', 'userRoles.role'],
  });

  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  if (user.disableuntil){
    const now =  new Date();

    if(now < user.disableuntil){
      throw new UnauthorizedException (`Account locked until ${user.disableuntil.toISOString()}`);
    }else{
      user.loginAttempts = 0;
      user.disableuntil = null;
      await this.userRepository.save(user);
    }
  }
  const isPasswordValid =  await Bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    if (user.loginAttempts>=3){
    user.disableuntil = new Date(Date.now() + 5*60*1000);
    await this.userRepository.save(user)
    throw new UnauthorizedException('Login attempts reached limit. Account will be available after 5 mins')

  }

    
    user.loginAttempts = (user.loginAttempts || 0)+1;
    await this.userRepository.save(user);
    throw new UnauthorizedException(`Invalid login details. failed attempts:${user.loginAttempts}`);

  }

  user.loginAttempts = 0;
  await this.userRepository.save(user);
  

  const roles = user.userRoles.map(ur => ur.role.rolename);
  const payload = {username,userid:user.userid, rolename:roles[0]};
  const accessToken = this.JwtService.sign(payload);

  return{
    
    accessToken,
    userid:user.userid,
    rolename:roles[0],
    username:user.username,
  };
} 

async unlockUsers(targetUsername: string, requestingUserId: number): Promise<string> {
  // 1️⃣ Check if the requesting user is super user
  const requestingUser = await this.userRepository.findOneBy({ userid: requestingUserId });
  if (!requestingUser || !requestingUser.IsSuperUser) {
    throw new ForbiddenException('Only super users can unlock users');
  }

  // 2️⃣ Find the target user by username
  const targetUser = await this.userRepository.findOneBy({ username: targetUsername });
  if (!targetUser) {
    throw new NotFoundException(`The username ${targetUsername} doesn't exist`);
  }

  // 3️⃣ Reset login info for the target user
  targetUser.loginAttempts = 0;
  targetUser.disableuntil = null;

  await this.userRepository.save(targetUser);

  return `User ${targetUser.username} has been unlocked by super user ${requestingUser.username}`;
}

async makeSuperUser(username:string, requestingUserIds:number):Promise<String>{

  const user = await this.userRepository.findOneBy({username});

  if(!user){
    throw new NotFoundException(`Username ${username} doesn't exist`);
  }

  user.IsSuperUser = true;
  await this.userRepository.save(user);

  return `${username} is now a SuperUser`;
}

}


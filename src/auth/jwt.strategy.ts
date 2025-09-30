import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtpayload } from './auth.credantial.Dto/jwt-payload.interface';
import { User } from '../user/user.entity';
import { useroles } from 'src/userrole/userole.entity';
import { plainToClass } from 'class-transformer';
import { UserRole } from 'src/role/role.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(useroles)
    private readonly userolerepo: Repository<useroles>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
      
      passReqToCallback:true,
    });
}

async validate(req:Request,payload: jwtpayload): Promise<any> {
  console.log('JWT payload recieved in validate():', payload);
  console.log('Raw token:',req.headers['authorization']);
    const { username,  } = payload;
  
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['userRoles', 'userRoles.role'],
    });
  
    // console.log('found user:',user);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if(!user.userRoles || user.userRoles.length ===0){
      throw new UnauthorizedException('user cannot access this side');
    }

    const firstrole = user.userRoles[0];

    if(!firstrole || !firstrole.role){
      throw new UnauthorizedException('role relation not found for user ')
    }

    const rolename = firstrole.role.rolename.toLocaleLowerCase();


    return{
      userid:user.userid,
      username:user.username,
      rolename : firstrole.role.rolename.toLocaleLowerCase(),
    };

    
    

    
}

 
}

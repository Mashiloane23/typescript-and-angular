import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class AccountLockGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.userid;

    if (!userId) return false;

    const user = await this.userRepository.findOne({ where: { userid: userId } });

    if (user?.disableuntil && new Date() < user.disableuntil) {
      throw new UnauthorizedException('Account locked. Please try again later.');
    }

    return true;
  }
}

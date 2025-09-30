import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // getUserById(userid: number): Promise<User | null> {
    //     return this.findOne({
    //         where: { userid }, // Ensure filtering by ID
    //     });
    // }
    
}

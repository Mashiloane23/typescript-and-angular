
import { Group } from "src/Group-allocation/Group.entity";
import { User } from "src/user/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('groupUser')
export class Groupuser{
    @PrimaryGeneratedColumn()
    
    id:number;

    @ManyToOne(() => Group,(group) => group.groupusers)
    group:Group;
    

    @ManyToOne (() => User,(user) => user.groupUser)
    user :User;
}
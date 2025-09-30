// import { Role } from "./role.entity";

import { Roles } from "src/role/role.entity";
import { task } from "src/task.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/role/role.entity";
import { JoinTable } from "typeorm";
import { useroles } from "../userrole/userole.entity";
import { TaskUser } from "src/Task_user/Task_user.Entity";
import { Groupuser } from "src/Group-user/groupUser.entity";
import { IsEmail, IsOptional } from "class-validator";





@Entity('user')
export class User{
    @PrimaryGeneratedColumn({name:'userid'})
    userid : number;

    @Column({unique:true})
    username : string;


    @Column()
    password : string;

  

   @Column({nullable:false})
   firstname :string;

   @Column({nullable:false})
   lastname : string;

   @Column({unique:true})
   @IsEmail()
   Email:string;

   @Column({default:0})
   @IsOptional()
   loginAttempts?: number;

   @Column({type:'timestamp',nullable:true})
   @IsOptional()
   disableuntil? : Date | null;

   @Column({default:false})
   IsSuperUser:boolean;

   @OneToMany(()=> TaskUser,(taskuser)=>taskuser.user , {eager:true})
   taskuser:TaskUser[];


  

   @OneToMany(() => useroles, (userRole) => userRole.user)
   userRoles: useroles[];

   @OneToMany(() => Groupuser,(groupUser) => groupUser.user)
   groupUser:Groupuser[];

   


}
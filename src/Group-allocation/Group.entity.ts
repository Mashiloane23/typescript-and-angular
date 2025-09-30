import { IsString } from "class-validator";
import { Groupuser } from "src/Group-user/groupUser.entity";
import { GroupTask } from "src/GroupTsk/GroupTask.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group{

    @PrimaryGeneratedColumn()
    GroupId:number;


    @IsString()
    @Column()
   groupname:string;

   @IsString()
   @Column()
   description:string;

   @OneToMany(() => Groupuser,(groupusers) => groupusers.group)
  
   groupusers:Groupuser[];

   @OneToMany(()=>GroupTask,(grouptask)=>grouptask.group)
   grouptask:GroupTask[];
   
   
}
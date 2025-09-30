import { group } from "console";
import { Group } from "src/Group-allocation/Group.entity";
import { Tasks } from "src/Task-info/Task.Entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('GroupTask')
export class GroupTask{
    @PrimaryGeneratedColumn()
    GroupTaskid:number;

    @ManyToOne(()=>Tasks,(tasks)=>tasks.groupTask)
    task:Tasks

    @ManyToOne(()=>Group,(groups)=>groups.grouptask)
    group:Group;

}
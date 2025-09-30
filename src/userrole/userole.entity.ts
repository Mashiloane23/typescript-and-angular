import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user.entity";
import { Roles } from "src/role/role.entity";


@Entity('userole')
export class useroles{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => User,(user)=>user.userRoles, {eager:true})
    @JoinColumn({ name: "userid" })
    user: User;

    @ManyToOne(() => Roles,(role) => role.userRole,{eager:true})
    @JoinColumn({ name: "roleid" })
    role: Roles;

    @Column()
    userid:number;

    @Column()
    roleid:number;

}
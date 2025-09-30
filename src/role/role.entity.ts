import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from 'src/user/user.entity';
import { useroles } from 'src/userrole/userole.entity';


export enum UserRole {
    System = 'system',
    Application = 'application',
}

export enum RoleAccess{
  Admin = 'admin',
  projectMangaer = 'project manager',
  developer = 'developer',
  qulaityAnalyst = 'quality analyst',
  viewer = 'viewer',
  systemAuditor ='system auditor',
  configurationManager = 'configuration manager',
  supportStaff = 'support staff'
}


@Entity('roles')
export class Roles {
  @PrimaryGeneratedColumn()
  roleid: number;

  @Column({type:'enum',enum:UserRole})

  roleType:UserRole;



 
  @Column({nullable:false,unique:true,type:'enum',enum:RoleAccess})
  // rolename:string;

  rolename:RoleAccess;

  @Column({nullable:false})
  description: string;

  

  @Column({default:false})
    isSoftDel :boolean;

  

  @BeforeInsert()
  @BeforeUpdate()
  normal(){
  if(this.roleType){
    this.roleType = this.roleType.toLowerCase() as UserRole;
  }
  }

    
    @OneToMany(() => useroles,(useRole) => useRole.role)
  userRole:useroles[];


  
 }

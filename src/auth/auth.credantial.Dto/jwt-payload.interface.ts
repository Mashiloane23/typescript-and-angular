import { User } from "../../user/user.entity";

export interface jwtpayload{
    username:string;
    
    userId:number;
    rolename:string;
    
}
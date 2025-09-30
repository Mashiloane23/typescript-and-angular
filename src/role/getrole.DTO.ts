import { IsNumber } from "class-validator";



export class gerolebyidDTO{
    @IsNumber()
    roleid:number;
}
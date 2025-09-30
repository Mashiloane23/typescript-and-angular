import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";




export class usroleDTO{
    @IsNumber()
    @ApiProperty()
    roleid:number;

    @IsNumber()
    @ApiProperty()
    userid:number;
}
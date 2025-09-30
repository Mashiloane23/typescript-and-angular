import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNumber } from "class-validator";

export class AssignTaskToUsersDto{

    @IsNumber()
    @ApiProperty()
    taskid:number;
    
    @IsArray()
    @IsNumber({} ,{each:true})
    
    @ArrayNotEmpty()
    @Type(() => Number)
    @ApiProperty()

        
    userid:number[];



    
}
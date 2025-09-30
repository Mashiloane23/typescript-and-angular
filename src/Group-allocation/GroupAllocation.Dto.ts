import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class GroupAllocatioNDto{
    
    @IsString()
    @ApiProperty()
    Groupname:string;
    @IsNumber()
    @ApiProperty()
    taskid:number;

    @IsArray()
    @IsNumber({} ,{each:true})
    @ArrayNotEmpty()
    @Type(() => Number)
    @ApiProperty()
    User: number[];

    @IsString()
    
    @ApiProperty()
    description:string;

    
}
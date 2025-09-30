import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, isEmpty, IsNumber } from "class-validator";


export class assignroletouserDTO{
    @IsNumber()
    @ApiProperty()
     roleid:number;

    
    @IsArray()
    @ArrayNotEmpty()
    @ApiProperty()
    @Type(() => Number)
    @IsNumber({}, {each:true})
    userid:number[];

    
}
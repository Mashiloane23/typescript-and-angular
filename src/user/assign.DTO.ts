import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";


export class assignrole{

    @IsNumber()
    @ApiProperty()
    
    userid:number;

    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Number)
    @IsNumber({}, {each:true})
    @ApiProperty()
    roleids:number[];
}
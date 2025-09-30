import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty } from "class-validator";



export class assignrolestouser{
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    @Type(() => Number)
    userid:number;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({each:true})
    @Type(() => Number)
    @ApiProperty()
    roleid:number[];
}
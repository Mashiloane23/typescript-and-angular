import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsInt, IsNotEmpty } from "class-validator";
import { IsNull } from "typeorm";


export class assign_users_role{
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    @Type(() => Number)
    roleid:number;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsInt({each:true})
    @Type(() => Number)
    @ApiProperty()
    userid:number[];



}
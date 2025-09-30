import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";


export class softdelDTO{
    // @IsBoolean()
    // isSoftDel :boolean;

    @IsNumber()
    @ApiProperty()
    roleid:number;
}
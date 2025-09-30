import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Matches, MaxLength, MinLength,IsArray, ArrayNotEmpty,ArrayUnique} from "class-validator";
import { UserRole } from "src/role/role.entity";



export class AuthCredDto {
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty()
    
    username : string;

    @IsString()
  @ApiProperty()
  password: string;

  

  // @MinLength(5)
  // @MaxLength(30)
  // @ApiProperty()
  // lastname: string;

  // @MinLength(5)
  // @MaxLength(30)
  // @ApiProperty()
  // firstname: string;

//     @IsString()
//     @MinLength(8)
//     @MaxLength(20)
//     @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
// ,{message: 'password is weak'})
//     password : string;

    

   
    

    }
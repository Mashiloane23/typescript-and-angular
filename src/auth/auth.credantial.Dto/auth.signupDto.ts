import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class authCredSigninDto{


    @IsString()
    
    @ApiProperty()
    username:string;


  @IsString()
  password: string; 
}
     

export class signupDTO{
      @IsString()
      @MinLength(8)
      @MaxLength(20)
      
      @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/, {
        message: 'password is weak',
      })
      @ApiProperty()
    password:string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty()
    lastname:string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty()
    @IsEmail()
    Email:string;

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty()
    firstname:string;

    
    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty()
    username:string;







    

}
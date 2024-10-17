import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserType } from 'src/common/interfaces/common.interface';

export class CreateUserDto {
  @ApiProperty({ description: 'Username of the user',default:'' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email of the user',default:'' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password of the user',default:'' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Type of user (Recruiter or Candidate)',enum:UserType,default:UserType.CANDIDATE })
  @IsNotEmpty()
  userType: UserType;
}

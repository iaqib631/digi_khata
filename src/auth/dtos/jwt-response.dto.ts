import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';


export class AuthResponseDto {
  @ApiProperty({ example: 'johndove@gmail.com' })
  @Expose()
  @Type(() => UserDto)
  user: UserDto;


  @Expose()
  token: string;
}

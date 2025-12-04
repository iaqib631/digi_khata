import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user-dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { AuthResponseDto } from './dtos/jwt-response.dto';
import { SignupResponseDto } from './dtos/signup-response.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiBearerAuth('access-token')
@Controller('auth')

export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('/signUp')
    @Serialize(SignupResponseDto)
    @ApiOperation({summary: 'create a new user'})
    @ApiResponse({status: 201, description: 'user has been created successfully.', type: SignupResponseDto})
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async createUser(@Body() body: CreateUserDto) {
        return await this.authService.signUp(body.email,body.password);
    }

    @Post('/signin')
    @Serialize(AuthResponseDto)
    @ApiOperation({summary: 'Login as a existing user'})
    @ApiResponse({status: 201, description: 'user has been loggedin successfully.', type: AuthResponseDto})
    @ApiResponse({ status: 400, description: 'Validation error.' })
    async signin(@Body() body: CreateUserDto) {
         return await this.authService.signIn(body.email, body.password);
    }

    
    @Get()
    @Serialize(UserDto)
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Get all users with email:abc@gmail.com' })
    @ApiResponse({ status: 200, description: 'List of users returned successfully.' })
    findAllUsers(@Query('email') email:string) {
        return this.userService.find(email);
    }


    @Delete('/:id')
    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Delete a user'})
    @ApiParam({ name: 'id', type: Number, example: 1 })
    @ApiResponse({ status: 200, description: 'user deleted successfully.' })
    @ApiResponse({ status: 404, description: 'user not found.' })
    remove(@Param('id',ParseIntPipe) id:number){
        return this.userService.remove(id);
    }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(email:string, password:string) {
        const users = await this.userService.find(email);
        if(users.length) {
            throw new BadRequestException('email already registered')
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password,salt,32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user  = await this.userService.create(email, result);

        return { message: 'Account created successfully' };
    }

    async signIn(email: string, password: string) {
        const [user] = await this.userService.find(email);

        if(!user) {
            throw new NotFoundException('user not found');
        }

        const[salt,storedHash] = user.password.split('.');

        const hash = (await scrypt(password,salt,32)) as Buffer;
        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('incorrect password')
        }
        const token = this.jwtService.sign({id:user.id, email: user.email});
        return {user,token};
    }

}

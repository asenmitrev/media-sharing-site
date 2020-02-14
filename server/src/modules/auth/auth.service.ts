import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '@models/login.dto';
import { User } from '@entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<Partial<User>> {
        const user = await this.usersService.findOne({username});//, password: this.usersService.hashPassword(pass)

        if (user && this.usersService.isValidPassword(pass, user)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    
    login(user: Partial<User>): LoginDTO {
        const payload = { username: user.username, sub: user.id };
        const dto = new LoginDTO();
        dto.access_token = this.jwtService.sign(payload);
        return dto;
    }
}

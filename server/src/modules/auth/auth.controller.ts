import { Controller, UseGuards, Post, Request, Get, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from '@models/user.dto';
import { UsersService } from '../users/users.service';
import { UserQueryFailedExceptionFilter } from '@app/filters/user-query-failed.filter';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard())
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @UseFilters(UserQueryFailedExceptionFilter)
    @Post('register')
    async register(@Body() user: UserDTO) {
        const userEntity = await this.usersService.create(user);
        return this.authService.login(userEntity);
    }
}

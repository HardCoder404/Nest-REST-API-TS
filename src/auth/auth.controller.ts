import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDTO } from './dto/signUp.dto';
import { loginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpDTO: signUpDTO): Promise<{ token: string }> {
        return this.authService.signUp(signUpDTO);
    }

    @Get('/login')
    async login(@Body() loginDTO: loginDTO): Promise<{ token: string }> {
        return this.authService.login(loginDTO);
    }
    
}

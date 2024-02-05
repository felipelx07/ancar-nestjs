import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('login')
@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    signIn(@Body() signInDto: Record<string, any>) {
        const cpf = signInDto.cpf.replace(/\.|-/gm, '');
        return this.authService.signIn(cpf, signInDto.senha);
    }
}
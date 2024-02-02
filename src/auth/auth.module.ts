import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from "./auth.controller";
import {jwtConstants} from "./auth.constants";
import {UsuarioModule} from "../usuario/usuario.module";

@Module({
    imports: [
        forwardRef(()=> UsuarioModule),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}
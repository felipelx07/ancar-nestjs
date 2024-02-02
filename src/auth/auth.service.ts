import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsuarioService} from "../usuario/usuario.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsuarioService,
        private jwtService: JwtService
    ) {
    }

    async signIn(cpf: string, senha: string): Promise<any> {
        const user = await this.usersService.login(cpf, senha);
        const payload = { sub: user.id, username: user.nome, document: user.cpf };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
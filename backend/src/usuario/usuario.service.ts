import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Usuario} from "./usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectModel(Usuario)
        private repository: typeof Usuario
    ) {
    }

    async create(user: Usuario): Promise<Usuario> {
        try {
            return await user.save();
        } catch (err) {
            if (err.original.constraint === 'Usuarios_cpf_key') {
                throw new HttpException(
                    `Usuario com CPF '${err.errors[0].value}' já existe`,
                    HttpStatus.CONFLICT,
                );
            }

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(cpf, senha): Promise<Usuario> {
        const user = await this.repository.findOne({
            rejectOnEmpty: undefined,
            where: {
                cpf: cpf,
                senha: senha
            }
        })

        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        return user;
    }

    async findAll(): Promise<Usuario[]> {
        return this.repository.findAll<Usuario>();
    }

    async findOne(id: string): Promise<Usuario> {
        const user = await this.repository.findByPk<Usuario>(id);
        if (!user) {
            throw new HttpException('Usuario not found.', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async update(id: string, toUpdate: Usuario) {
        const user = await this.findOne(id);

        user.nome = toUpdate.nome || user.nome;
        user.senha = toUpdate.senha || user.senha;

        try {
            return await user.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        await user.destroy();
    }
}

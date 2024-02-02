import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import {Usuario} from "./usuario.entity";

export class UsuarioDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255,{message: 'Tamanho máximo é de 255 caracteres'})
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(99,{message: 'Tamanho máximo é de 99 caracteres'})
    senha: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(11,{message: 'Tamanho máximo é de 11 caracteres'})
    cpf: string;

    constructor(entity: Usuario) {
        this.nome = entity.nome;
        this.senha = entity.senha;
        this.cpf = entity.cpf;
    }
}

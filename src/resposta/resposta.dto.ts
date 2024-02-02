import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";
import {Resposta} from "./resposta.entity";

export class RespostaDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {message: 'Tamanho máximo é de 255 caracteres'})
    descricao: string;

    constructor(entity: Resposta) {
        this.descricao = entity.descricao;
    }
}

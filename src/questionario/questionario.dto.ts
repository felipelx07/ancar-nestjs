import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsString, MaxLength} from "class-validator";
import {PerguntaDto} from "../pergunta/pergunta.dto";
import {Questionario} from "./questionario.entity";

export class QuestionarioDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {message: 'Tamanho máximo é de 255 caracteres'})
    nome: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {message: 'Tamanho máximo é de 255 caracteres'})
    descricao: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    perguntas: PerguntaDto[] = [];
}

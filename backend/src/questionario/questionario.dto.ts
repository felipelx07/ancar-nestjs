import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {PerguntaDto} from "../pergunta/pergunta.dto";

export class QuestionarioDto {

    @ApiProperty()
    @IsOptional()
    id: string;

    @ApiProperty()
    @IsOptional()
    data: string;

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

import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class RespostaDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Deve informar sua resposta a pergunta'})
    @IsString()
    @MaxLength(255, {message: 'Tamanho máximo é de 255 caracteres'})
    descricao: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Deve informar o Id da Pergunta'})
    perguntaId: number;
}

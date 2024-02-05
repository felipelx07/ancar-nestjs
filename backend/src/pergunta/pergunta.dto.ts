import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString, MaxLength} from "class-validator";

export class PerguntaDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255,{message: 'Tamanho máximo é de 255 caracteres'})
    descricao: string;
}

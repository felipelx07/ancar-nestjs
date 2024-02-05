import {Pergunta} from "./pergunta.entity";
import {QuestionarioDto} from "../questionario/questionario.dto";

export class PerguntaConverter {
    static toEntityList(questionarioDto: QuestionarioDto): Pergunta[] {
        return questionarioDto.perguntas.map(perguntaDto => new Pergunta(perguntaDto));
    }
}
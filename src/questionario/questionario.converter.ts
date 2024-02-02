import {QuestionarioDto} from "./questionario.dto";
import {Pergunta} from "../pergunta/pergunta.entity";
import {Questionario} from "./questionario.entity";

export class QuestionarioConverter {
    static toEntity(dto: QuestionarioDto): Questionario {
        let perguntas = dto.perguntas.map(pergunta => new Pergunta(pergunta));
        return new Questionario({
            nome: dto.nome,
            descricao: dto.descricao,
            perguntas: perguntas
        });
    }

    static toDtoList(list: Questionario[]): QuestionarioDto[] {
        const dtoList: QuestionarioDto[] = [];
         list.map(entity => {
            const questionarioDto = new QuestionarioDto(entity);
             dtoList.push(questionarioDto);
        });
         return dtoList;
    }
}
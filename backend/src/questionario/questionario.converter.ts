import {QuestionarioDto} from "./questionario.dto";
import {Questionario} from "./questionario.entity";
import {PerguntaDto} from "../pergunta/pergunta.dto";

export class QuestionarioConverter {
    static toEntity(dto: QuestionarioDto): Questionario {
        return new Questionario({
            nome: dto.nome,
            descricao: dto.descricao,
            data: new Date()
        });
    }

    static toDto(entity): QuestionarioDto {
        let dto = new QuestionarioDto();
        dto.id = entity.id;
        entity.perguntas?.map(pergunta => {
            let perguntaDto = new PerguntaDto();
            perguntaDto.descricao = pergunta.descricao;
            dto.perguntas.push(perguntaDto);
        });
        dto.nome = entity.nome;
        dto.descricao = entity.descricao;
        return dto;
    }

    static toDtoList(list: Questionario[]): QuestionarioDto[] {
        const dtoList: QuestionarioDto[] = [];
        list.map(entity => {
            const questionarioDto = this.toDto(entity);
            dtoList.push(questionarioDto);
        });
        return dtoList;
    }
}
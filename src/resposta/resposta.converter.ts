import {Resposta} from "./resposta.entity";
import {RespostaDto} from "./resposta.dto";

export class RespostaConverter {
    static toDtoList(list: Resposta[]): RespostaDto[] {
        const dtoList: RespostaDto[] = [];
        list.map(entity => {
            const respostaDto = this.toDto(entity);
            dtoList.push(respostaDto);
        });
        return dtoList;
    }

    static toDto(resposta: Resposta): RespostaDto {
        let dto = new RespostaDto();
        dto.descricao = resposta.descricao;
        return dto;
    }
}
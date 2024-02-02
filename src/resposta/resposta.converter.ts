import {Resposta} from "./resposta.entity";
import {RespostaDto} from "./resposta.dto";

export class RespostaConverter {
    static toDtoList(list: Resposta[]): RespostaDto[] {
        const dtoList: RespostaDto[] = [];
        list.map(entity => {
            const usuarioDto = new RespostaDto(entity);
            dtoList.push(usuarioDto);
        });
        return dtoList;
    }
}
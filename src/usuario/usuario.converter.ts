import {Usuario} from "./usuario.entity";
import {UsuarioDto} from "./usuario.dto";

export class UsuarioConverter {
    static toDtoList(list: Usuario[]): UsuarioDto[] {
        const dtoList: UsuarioDto[] = [];
        list.map(entity => {
            const usuarioDto = this.toDto(entity);
            dtoList.push(usuarioDto);
        });
        return dtoList;
    }

    static toDto(entity: Usuario): UsuarioDto {
        let dto = new UsuarioDto();
        dto.nome = entity.nome;
        dto.senha = entity.senha;
        dto.cpf = entity.cpf;
        return dto;
    }
}
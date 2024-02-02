import {Usuario} from "./usuario.entity";
import {UsuarioDto} from "./usuario.dto";

export class UsuarioConverter {
    static toDtoList(list: Usuario[]): UsuarioDto[] {
        const dtoList: UsuarioDto[] = [];
        list.map(entity => {
            const usuarioDto = new UsuarioDto(entity);
            dtoList.push(usuarioDto);
        });
        return dtoList;
    }
}
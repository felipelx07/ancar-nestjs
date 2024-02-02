import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {UsuarioService} from "./usuario.service";
import {UsuarioDto} from "./usuario.dto";
import {Usuario} from "./usuario.entity";
import {UsuarioConverter} from "./usuario.converter";

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly service: UsuarioService) {
    }

    @Post()
    @ApiOkResponse({type: UsuarioDto})
    create(@Body() userDto: UsuarioDto) {
        let user = new Usuario(userDto);
        user = await this.service.create(user);
        return new UsuarioDto(user);
    }

    @UseGuards(AuthGuard)
    @Get()
    @ApiOkResponse({type: [UsuarioDto]})
    findAll() {
        const list = await this.service.findAll();
        return UsuarioConverter.toDtoList(list);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiOkResponse({type: UsuarioDto})
    findOne(@Param('id') id: string) {
        const usuario = await this.service.findOne(id);
        return new UsuarioDto(usuario);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    @ApiOkResponse({type: UsuarioDto})
    update(@Param('id') id: string, @Body() userDto: UsuarioDto) {
        const usuario = new Usuario(userDto);
        return this.service.update(id, usuario);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOkResponse()
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}

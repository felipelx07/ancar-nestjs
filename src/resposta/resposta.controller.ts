import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {RespostaService} from "./resposta.service";
import {RespostaDto} from "./resposta.dto";
import {Resposta} from "./resposta.entity";
import {RespostaConverter} from "./resposta.converter";

@ApiTags('respostas')
@Controller('/')
@UseGuards(AuthGuard)
export class RespostaController {
    constructor(private readonly service: RespostaService) {
    }

    @Post('questionarios/:id/respostas')
    @ApiOkResponse({type: RespostaDto})
    async create(@Param('id') id: string, @Body() dto: RespostaDto) {
        let resposta = new Resposta(dto);
        resposta = await this.service.create(resposta);
        return RespostaConverter.toDto(resposta);
    }

    @Get('questionarios/:id/respostas')
    @ApiOkResponse({type: [RespostaDto]})
    async findAll() {
        const list = await this.service.findAll();
        return RespostaConverter.toDtoList(list);
    }

    @Patch('questionarios/:id/respostas/:id')
    @ApiOkResponse({type: RespostaDto})
    async update(@Param('id') id: string, @Body() dto: RespostaDto) {
        let resposta = new Resposta(dto);
        resposta = await this.service.update(id, resposta);
        return RespostaConverter.toDto(resposta);
    }

    @Delete('questionarios/:id/respostas/:id')
    @ApiOkResponse()
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}

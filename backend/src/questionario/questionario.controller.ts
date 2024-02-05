import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "../auth/auth.guard";
import {QuestionarioService} from "./questionario.service";
import {QuestionarioDto} from "./questionario.dto";
import {QuestionarioConverter} from "./questionario.converter";
import {PerguntaConverter} from "../pergunta/pergunta.converter";

@ApiTags('questionarios')
@Controller('questionarios')
export class QuestionarioController {
    constructor(private readonly service: QuestionarioService) {
    }

    @UseGuards(AuthGuard)
    @Post()
    @ApiOkResponse({type: QuestionarioDto})
    async create(@Body() dto: QuestionarioDto) {
        let questionario = QuestionarioConverter.toEntity(dto);
        questionario = await this.service.create(questionario, PerguntaConverter.toEntityList(dto));
        return QuestionarioConverter.toDto(questionario);
    }

    @Get()
    @ApiOkResponse({type: [QuestionarioDto]})
    async findAll() {
        const list = await this.service.findAll();
        return QuestionarioConverter.toDtoList(list);
    }

    @Get(':id')
    @ApiOkResponse({type: QuestionarioDto})
    async findOne(@Param('id') id: string) {
        const questionario = await this.service.findOne(id);
        return QuestionarioConverter.toDto(questionario);
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    @ApiOkResponse({type: QuestionarioDto})
    async update(@Param('id') id: string, @Body() dto: QuestionarioDto) {
        let questionario = QuestionarioConverter.toEntity(dto);
        questionario = await this.service.update(id, questionario);
        return QuestionarioConverter.toDto(questionario);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiOkResponse()
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}

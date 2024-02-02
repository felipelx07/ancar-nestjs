import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Pergunta} from "./pergunta.entity";
import {PerguntaDto} from "./pergunta.dto";

@Injectable()
export class PerguntaService {
    constructor(
        @InjectModel(Pergunta)
        private repository: typeof Pergunta
    ) {
    }

    async create(dto: PerguntaDto): Promise<Pergunta> {
        try {
            const pergunta = new Pergunta(dto);
            return await pergunta.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Pergunta[]> {
        return this.repository.findAll<Pergunta>();
    }

    async findOne(id: string): Promise<Pergunta> {
        const pergunta = await this.repository.findByPk<Pergunta>(id);
        if (!pergunta) {
            throw new HttpException('Pergunta não encontrada', HttpStatus.NOT_FOUND);
        }
        return pergunta;
    }

    async update(id: string, dto: PerguntaDto) {
        const pergunta = await this.findOne(id);
        pergunta.descricao = dto.descricao || pergunta.descricao;
        try {
            return await pergunta.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const pergunta = await this.findOne(id);
        await pergunta.destroy();
    }
}

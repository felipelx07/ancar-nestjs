import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Resposta} from "./resposta.entity";

@Injectable()
export class RespostaService {
    constructor(
        @InjectModel(Resposta)
        private repository: typeof Resposta
    ) {
    }

    async create(resposta: Resposta): Promise<Resposta> {
        try {
            return await resposta.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Resposta[]> {
        return this.repository.findAll<Resposta>();
    }

    private async findOne(id: string): Promise<Resposta> {
        const resposta = await this.repository.findByPk<Resposta>(id);
        if (!resposta) {
            throw new HttpException('Resposta não encontrada', HttpStatus.NOT_FOUND);
        }
        return resposta;
    }

    async update(id: string, respostaUpdated: Resposta) {
        const resposta = await this.findOne(id);
        resposta.descricao = respostaUpdated.descricao || resposta.descricao;
        try {
            return await resposta.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const resposta = await this.findOne(id);
        await resposta.destroy();
    }
}

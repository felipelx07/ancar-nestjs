import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Questionario} from "./questionario.entity";
import {Pergunta} from "../pergunta/pergunta.entity";

@Injectable()
export class QuestionarioService {
    constructor(
        @InjectModel(Questionario)
        private repository: typeof Questionario
    ) {
    }

    async create(questionario: Questionario): Promise<Questionario> {
        try {
            return await questionario.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Questionario[]> {
        return await this.repository.findAll<Questionario>({
            include: [Pergunta],
        });
    }

    async findOne(id: string): Promise<Questionario> {
        const questionario = await this.repository.findByPk<Questionario>(id);
        if (!questionario) {
            throw new HttpException('Questionário não encontrado.', HttpStatus.NOT_FOUND);
        }
        return questionario;
    }

    async update(id: string, questionario: Questionario) {
        await this.findOne(id);

        try {
            return await questionario.save();
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async remove(id: string) {
        const questionario = await this.findOne(id);
        await questionario.destroy();
    }
}

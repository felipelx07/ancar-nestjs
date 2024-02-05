import {BelongsTo, Column, DataType, ForeignKey, Model, Table,} from 'sequelize-typescript';
import {Pergunta} from "../pergunta/pergunta.entity";

@Table
export class Resposta extends Model<Resposta> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    descricao: string;

    @ForeignKey(() => Pergunta)
    perguntaId: number;

    @BelongsTo(() => Pergunta)
    pergunta: Pergunta;
}
import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table,} from 'sequelize-typescript';
import {Questionario} from "../questionario/questionario.entity";
import {Resposta} from "../resposta/resposta.entity";

@Table
export class Pergunta extends Model<Pergunta> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    descricao: string;

    @ForeignKey(() => Questionario)
    questionarioId: number;

    @BelongsTo(() => Questionario)
    questionario: Questionario;

    @HasMany(() => Resposta, {
        onDelete: 'cascade'
    })
    respostas: Resposta[];

}
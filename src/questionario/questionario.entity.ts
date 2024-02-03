import {Column, DataType, HasMany, Model, Table,} from 'sequelize-typescript';
import {Pergunta} from "../pergunta/pergunta.entity";

@Table
export class Questionario extends Model<Questionario> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    data: Date = new Date();

    @Column
    nome: string;

    @Column
    descricao: string;

    @HasMany(() => Pergunta)
    perguntas: Pergunta[];

}
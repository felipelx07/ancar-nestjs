import {Column, DataType, Model, Table, Unique,} from 'sequelize-typescript';

@Table
export class Usuario extends Model<Usuario> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: string;

    @Column
    nome: string;

    @Column
    senha: string;

    @Unique
    @Column({
        type: DataType.STRING(11),
    })
    cpf: string;
}
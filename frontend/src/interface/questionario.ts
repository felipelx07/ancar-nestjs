export interface Pergunta{
    descricao: string;
}

export interface Questionario {
    id: string;
    nome: string;
    descricao: string;
    perguntas: Pergunta[];
}
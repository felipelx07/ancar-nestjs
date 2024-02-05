import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import ApiService from '../service/api';
import {Pergunta, Questionario} from '../interface/questionario';
import {Button, Grid, IconButton, Snackbar, TextField} from "@material-ui/core";
import {Add, Delete} from "@material-ui/icons";
import useStyles from "../shared/style";

const CadastroQuestionario: React.FC = () => {
    const classes = useStyles();
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
    const [novaPergunta, setNovaPergunta] = useState('');
    const [alert, setAlert] = useState({
        isOpen: false, message: ''
    });
    const [isLoaded, setIsLoaded] = useState(true);
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        if (params.id && !id.length && isLoaded) {
            ApiService.findQuestionario(Number(params.id))
                .then(resp => {
                    setId(params.id as string)
                    setNome(resp.data.nome);
                    setDescricao(resp.data.descricao);
                    setPerguntas(resp.data.perguntas);
                })
                .catch(error => {
                    setIsLoaded(false);
                    if (error.response.status) {
                        setAlert({
                            isOpen: true,
                            message: 'Questionário não encontrado'
                        })
                    }
                })
        }
    });

    const salvarQuestionario = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const questionario: Questionario = {
            id,
            nome,
            descricao,
            perguntas
        };

        if (id)
            await ApiService.updateQuestionario(id,questionario)
                .then(() => afterSaveAction())
        else
            await ApiService.createQuestionario(questionario)
                .then(() =>  afterSaveAction())
    };

    const afterSaveAction = async () => {
        setAlert({
            isOpen: true,
            message: 'Questionário salvo com sucesso'
        })
        navigate('/listagem-questionarios');
    };

    const addPergunta = (value: string) => {
        const pergunta: Pergunta = {
            descricao: value
        };
        perguntas.push(pergunta)
        setPerguntas([...perguntas]);
        setNovaPergunta('');
    };

    const deleteQuestionario = async () => {
        await ApiService.deleteQuestionario(id);
        navigate('../listagem-questionarios');
    };

    const deletePergunta = (index: number) => {
        const newPerguntas = [...perguntas];
        newPerguntas.splice(index, 1);
        setPerguntas(newPerguntas);
    };

    const updatePergunta = (index: number, value: string) => {
        const newPerguntas = [...perguntas];
        newPerguntas[index].descricao = value;
        setPerguntas(newPerguntas);
    };

    const onCloseSnackbar = () => {
        setAlert({
            isOpen: false,
            message: ''
        })
    }

    const fwrListar = () => {
        navigate('../listagem-questionarios')
    }

    return (
        <div className={classes.container}>
            <div>
                <h1>Cadastro de Questionário</h1>
                <form className={classes.form} onSubmit={salvarQuestionario}>
                    <Snackbar
                        open={alert.isOpen}
                        autoHideDuration={3000}
                        onClose={onCloseSnackbar}
                        message={alert.message}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    />
                    <TextField
                        label="Título"
                        value={nome}
                        required={true}
                        onChange={(e) => setNome(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        label="Descrição"
                        multiline
                        rows={4}
                        required={true}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                    />

                    {perguntas?.map((pergunta, index) => (
                        <Grid container spacing={2}>
                            <Grid item xs={10} key={index}>
                                <TextField
                                    label="Pergunta"
                                    required={true}
                                    value={pergunta.descricao}
                                    onChange={(e) => updatePergunta(index, e.target.value)}
                                    className={classes.textField}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={2} key={index}>
                                <IconButton aria-label="plus" onClick={() => deletePergunta(index)}>
                                    <Delete/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}

                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <TextField
                                label="Pergunta"
                                value={novaPergunta}
                                onChange={(e) => setNovaPergunta(e.target.value)}
                                className={classes.textField}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton aria-label="plus" onClick={() => addPergunta(novaPergunta)}>
                                <Add/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" color="primary" onClick={fwrListar} className={classes.button}>
                        Listar
                    </Button>
                    {id.length > 0 &&
                    <Button variant="outlined" color="secondary"
                            disabled={!id.length}
                            className={classes.button}
                            onClick={deleteQuestionario}
                    >
                        Remover
                    </Button>}

                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Salvar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CadastroQuestionario;
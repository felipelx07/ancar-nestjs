import React, {useEffect, useState} from 'react';
import {Questionario} from '../interface/questionario';
import ApiService from '../service/api';
import {Box, Button, Card, CardContent, Grid, Typography} from '@material-ui/core';
import {useNavigate} from "react-router-dom";

const ListagemQuestionario: React.FC = () => {
    const [questionarios, setQuestionarios] = useState<Questionario[]>([]);
    const navigate = useNavigate();

    const handleClick = (id: number) => {
        navigate(`/cadastro-questionario/${id}`);
    };

    const fwrCadastrarUsuario = () => {
        navigate(`/cadastro-questionario`);
    };

    useEffect(() => {
        const fetchQuestionarios = async () => {
            const response = await ApiService.listQuestionario();
            setQuestionarios(response.data);
        };

        fetchQuestionarios();
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: '#c9c9c9'
        }}>
            <Box sx={{maxWidth: '600px', minWidth: '300px'}}>
                <Grid container spacing={10} justify="center" alignItems="baseline">
                    <Grid item xs={8}>
                        <Typography variant="h3" gutterBottom style={{marginBottom: '60px', marginTop: '20px'}}>
                            Questionários
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Button  style={{marginTop: '-15px', borderRadius: 70, width: 28, height: 60}}
                                 variant="contained"
                                 type="button"
                                 color="primary"
                                 onClick={fwrCadastrarUsuario}>
                            <Typography variant="h4">
                                +
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={5} justify="center">
                    {questionarios.map((questionario) => (
                        <Grid item xs={8}>
                            <Card key={questionario.nome}>
                                <CardContent style={{padding: '10px'}}>
                                    <Typography variant="h5" gutterBottom style={{marginTop: 20}}>
                                        {questionario.nome}
                                    </Typography>
                                    <Typography variant="body2">
                                        {questionario.descricao}
                                    </Typography>
                                    <Typography variant="body2" style={{marginTop: 20}}>
                                        Perguntas: {questionario.perguntas.length}
                                    </Typography>
                                    <Button variant="contained" style={{marginTop: '3rem', marginBottom: '2rem'}}
                                            onClick={() => handleClick(Number(questionario.id))}>Visualizar</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

export default ListagemQuestionario;

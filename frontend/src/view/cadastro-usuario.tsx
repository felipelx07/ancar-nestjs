import React, {useState} from 'react';
import ApiService from '../service/api';
import {Usuario} from '../interface/usuario';
import {Button, Snackbar, TextField} from "@material-ui/core";
import useStyles from "../shared/style";
import maskCPF from "../shared/mask";
import {useNavigate} from "react-router-dom";

const CadastroUsuario: React.FC = () => {
    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState({
        isOpen: false, message: ''
    });
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: Usuario = {
            nome,
            cpf,
            senha,
        };
        await ApiService.createUsuario(data)
            .then(response => {
                console.log(response);
                setAlert({
                    isOpen: true,
                    message: 'Usuário cadastrado com sucesso!'
                })
            }).catch(error => {
                setAlert({
                    isOpen: true,
                    message: 'Erro: ' + error.message
                })
            })
    };

    const handleCpf = (e: any) => {
        setCpf(maskCPF(e.target.value));
    };

    const voltar = () => {
        navigate('../login')
    };

    return (
        <div className={classes.container}>
            <div>
                <h1>Cadastro de Usuário</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Snackbar
                        open={alert.isOpen}
                        autoHideDuration={6000}
                        message={alert.message}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    />

                    <TextField
                        label="Nome completo"
                        required={true}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        label="CPF"
                        required={true}
                        placeholder={'999.999.999-99'}
                        value={cpf}
                        onChange={handleCpf}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        label="Senha"
                        required={true}
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className={classes.textField}
                        margin="normal"
                    />
                    <Button variant="outlined" color="primary" onClick={voltar} className={classes.button}>
                        Voltar
                    </Button>
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Cadastrar
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CadastroUsuario;

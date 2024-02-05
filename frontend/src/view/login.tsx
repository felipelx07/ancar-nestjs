import React, {useState} from 'react';
import {Button, Snackbar, TextField} from "@material-ui/core";
import useStyles from "../shared/style";
import {useNavigate} from "react-router-dom";
import ApiService from '../service/api';
import maskCPF from "../shared/mask";

const Login = () => {
    const classes = useStyles();
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleCpf = (e: any) => {
        setCpf(maskCPF(e.target.value));
    };

    const hideAlert = () => {
        setOpen(false);
    };

    const redirectNovoUsuario = () => {
        navigate('../cadastro-usuario')
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        await ApiService.doLogin(cpf, senha)
            .then(response => {
                localStorage.setItem('token', response.data.access_token);
                navigate('../listagem-questionarios');
            })
            .catch(() => {
                setOpen(true);
            });
    };

    return (
        <div className={classes.container}>
            <div>
                <h1>Login</h1>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                    <Button variant="outlined"
                            color="primary"
                            type="button"
                            className={classes.button}
                            onClick={redirectNovoUsuario}>
                        Cadastrar
                    </Button>
                    <Button variant="contained" color="primary" type="submit" className={classes.button}>
                        Acessar
                    </Button>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={hideAlert}
                        message={'Credenciais Invalidas'}
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;

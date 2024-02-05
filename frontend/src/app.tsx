import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import CadastroUsuario from './view/cadastro-usuario';
import CadastroQuestionario from './view/cadastro-questionario';
import ListagemQuestionarios from './view/listagem-questionario';
import Login from "./view/login";
import PrivateRoutes from "./route/private.routes";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/cadastro-usuario" element={<CadastroUsuario/>}/>
                        <Route path="/cadastro-questionario" element={<CadastroQuestionario/>}/>
                        <Route path="/cadastro-questionario/:id" element={<CadastroQuestionario/>}/>
                        <Route path="/listagem-questionarios" element={<ListagemQuestionarios/>}/>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;

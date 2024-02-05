import axios from 'axios';
import {Questionario} from "../interface/questionario";
import {Usuario} from "../interface/usuario";

const BASE_FRONT_URL = 'http://localhost:3000'
const BASE_API_URL = 'http://localhost:4000/api'

const api = axios.create({
    baseURL: BASE_API_URL,
});

class ApiService {

    getBaseApiURL(){
        return BASE_API_URL;
    }

    doLogin(cpf: string, senha: string) {
        const data = {cpf: cpf, senha: senha}
        return api.post(BASE_API_URL + "/login", data);
    }

    findQuestionario(id: number) {
        return api.get(BASE_API_URL + `/questionarios/${id}`);
    }

    listQuestionario() {
        return api.get(BASE_API_URL + "/questionarios");
    }

    createQuestionario(data: Questionario) {
        return api.post(BASE_API_URL + "/questionarios", data);
    }

    updateQuestionario(id: string, data: Questionario) {
        return api.patch(BASE_API_URL + `/questionarios/${id}`, data);
    }

    deleteQuestionario(id: string) {
        return api.delete(BASE_API_URL + `/questionarios/${id}`);
    }

    createUsuario(data: Usuario) {
        return api.post(BASE_API_URL + "/usuarios", data);
    }
}

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            localStorage.removeItem('token');
            window.location.replace(BASE_FRONT_URL + '/login');
        }

        return Promise.reject(error);
    }
);

export default new ApiService();

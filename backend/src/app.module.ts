import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModule} from "./auth/auth.module";
import {QuestionarioModule} from "./questionario/questionario.module";
import {PerguntaModule} from "./pergunta/pergunta.module";
import {RespostaModule} from "./resposta/resposta.module";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: '0.0.0.0',
            username: 'postgres',
            password: 'postgres',
            database: 'ancar',
            port: 5432,
            autoLoadModels: true,
            synchronize: true
        }),
        AuthModule,
        UsuarioModule,
        PerguntaModule,
        QuestionarioModule,
        RespostaModule,
    ],
})
export class AppModule {
}

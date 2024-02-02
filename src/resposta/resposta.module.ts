import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {RespostaService} from "./resposta.service";
import {RespostaController} from "./resposta.controller";
import {Resposta} from "./resposta.entity";

@Module({
    imports: [
        SequelizeModule.forFeature([Resposta])
    ],
    providers: [RespostaService],
    controllers: [RespostaController],
    exports: [RespostaService]
})
export class RespostaModule {
}

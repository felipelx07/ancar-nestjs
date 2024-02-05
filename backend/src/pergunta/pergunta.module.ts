import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {PerguntaService} from "./pergunta.service";
import {Pergunta} from "./pergunta.entity";

@Module({
    imports: [
        SequelizeModule.forFeature([Pergunta])
    ],
    providers: [PerguntaService],
    exports: [PerguntaService]
})
export class PerguntaModule {
}

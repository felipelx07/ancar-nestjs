import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {QuestionarioService} from "./questionario.service";
import {QuestionarioController} from "./questionario.controller";
import {Questionario} from "./questionario.entity";

@Module({
    imports: [
        SequelizeModule.forFeature([Questionario])
    ],
    providers: [QuestionarioService],
    controllers: [QuestionarioController],
    exports: [QuestionarioService]
})
export class QuestionarioModule {
}

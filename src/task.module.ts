import { Module } from "@nestjs/common";
import { TypeOrmModule} from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Taskrepository} from "./task.repository";
import { task } from "./task.entity";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";


@Module({
   
    imports:[
        ConfigModule,
        TypeOrmModule.forFeature([task]), AuthModule, PassportModule.register({defualtStrategy: 'jwt'})],
    controllers:[AppController],
    providers:[AppService,Taskrepository],
    exports:[Taskrepository],
})

export class taskmodule{}
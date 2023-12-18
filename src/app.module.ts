import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ApplicationsModule } from '@app/applications/applications.module';
import { AuthenticationModule } from '@app/authentication/authentication.module';
import configuration from '@app/configuration';
import { JobsModule } from '@app/jobs/jobs.module';
import { OrganisationsModule } from '@app/organisation/organisations.module';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('db.postgres.host'),
                port: configService.get<number>('db.postgres.port'),
                username: configService.get<string>('db.postgres.username'),
                password: configService.get<string>('db.postgres.password'),
                database: configService.get<string>('db.postgres.databaseName'),
                synchronize: configService.get<boolean>('db.synchronize'),
                autoLoadEntities: true,
            }),
        }),
        ApplicationsModule,
        AuthenticationModule,
        JobsModule,
        OrganisationsModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ApplicationsModule } from '@app/applications/applications.module';
import { AuthenticationModule } from '@app/authentication/authentication.module';
import configuration from '@app/configuration';
import { AllExceptionsFilter } from '@app/filters/global-exception.filter';
import { JobsModule } from '@app/jobs/jobs.module';
import { RequestLoggerMiddleware } from '@app/middlewares/logger.middleware';
import { OrganisationsModule } from '@app/organisation/organisations.module';
import { UsersModule } from '@app/users/users.module';
import {
    ClassSerializerInterceptor,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
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
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        AppService,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}

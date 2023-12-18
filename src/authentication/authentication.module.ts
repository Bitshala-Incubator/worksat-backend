import { AuthenticationController } from '@app/authentication/authentication.controller';
import { AuthenticationGuard } from '@app/authentication/authentication.guard';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UsersModule } from '@app/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('app.jwtSecret'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
        UsersModule,
        ConfigModule,
    ],
    controllers: [AuthenticationController],
    providers: [
        AuthenticationService,
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard,
        },
    ],
})
export class AuthenticationModule {}

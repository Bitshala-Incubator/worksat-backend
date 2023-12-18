import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDefined,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';

class AppConfig {
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    port: number;

    @IsNotEmpty()
    @Type(() => Boolean)
    corsEnabled: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @Type(() => String)
    corsAllowedOrigins: Array<string>;

    @IsString()
    @IsNotEmpty()
    jwtSecret: string;
}

class PostgresConfig {
    @IsString()
    @IsNotEmpty()
    host: string;

    @IsNumber()
    @IsNotEmpty()
    port: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    databaseName: string;
}

class DbConfig {
    @IsDefined()
    @ValidateNested()
    @Type(() => PostgresConfig)
    postgres: PostgresConfig;

    @IsBoolean()
    @IsNotEmpty()
    @Type(() => Boolean)
    synchronize: boolean;
}

export class ApiConfig {
    @IsDefined()
    @ValidateNested()
    @Type(() => AppConfig)
    app: AppConfig;

    @IsDefined()
    @ValidateNested()
    @Type(() => DbConfig)
    db: DbConfig;
}

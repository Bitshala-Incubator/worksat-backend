import { IsValidPassword } from '@app/common/common.validators';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    givenName: string;

    @IsString()
    @IsNotEmpty()
    familyName: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsValidPassword()
    password: string;
}

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

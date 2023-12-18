import { Gender } from '@app/common/common.enums';
import { Availability } from '@app/users/users.enum';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsRequest {
    @IsString()
    @IsOptional()
    givenName?: string;

    @IsString()
    @IsOptional()
    familyName?: string;

    @IsEmail()
    @IsOptional()
    emailAddress?: string;

    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @IsEnum(Availability)
    @IsOptional()
    availability?: Availability;
}

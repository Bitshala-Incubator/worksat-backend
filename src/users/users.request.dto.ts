import { Gender, Roles, Skills } from '@app/common/common.enums';
import { Availability } from '@app/users/users.enum';
import {
    ArrayUnique,
    IsArray,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

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

    @IsEnum(Skills, { each: true })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    skills?: Skills[];

    @IsEnum(Roles, { each: true })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    roles?: Roles[];
}

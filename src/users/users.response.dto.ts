import { Gender, Roles, Skills } from '@app/common/common.enums';
import { Availability } from '@app/users/users.enum';
import {
    ArrayUnique,
    IsArray,
    IsEmail,
    IsEnum,
    IsString,
    IsUUID,
} from 'class-validator';

export class UserDetailsResponse {
    @IsUUID()
    id: string;

    @IsString()
    givenName: string;

    @IsString()
    familyName: string;

    @IsEmail()
    emailAddress: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsEnum(Availability)
    availability: Availability;

    @IsEnum(Skills, { each: true })
    @IsArray()
    @ArrayUnique()
    skills: Skills[];

    @IsEnum(Roles, { each: true })
    @IsArray()
    @ArrayUnique()
    roles: Roles[];

    constructor(partial: Partial<UserDetailsResponse>) {
        Object.assign(this, partial);
    }
}

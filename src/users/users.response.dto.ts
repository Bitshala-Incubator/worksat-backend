import { Gender } from '@app/common/common.enums';
import { Availability } from '@app/users/users.enum';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

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

    constructor(partial: Partial<UserDetailsResponse>) {
        Object.assign(this, partial);
    }
}

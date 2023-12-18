import { IsString, IsUUID } from 'class-validator';

export class AuthResponse {
    @IsString()
    token: string;

    @IsUUID()
    userId: string;

    constructor(partial: Partial<AuthResponse>) {
        Object.assign(this, partial);
    }
}

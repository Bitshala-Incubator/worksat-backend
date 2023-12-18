import { IsUUID } from 'class-validator';

export class CreateApplicationResponseDto {
    @IsUUID()
    id: string;

    constructor(partial: Partial<CreateApplicationResponseDto>) {
        Object.assign(this, partial);
    }
}

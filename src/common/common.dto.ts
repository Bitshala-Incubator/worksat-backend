import { IsTimestamp } from '@app/common/common.validators';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginatedQueryDto {
    @IsNumber()
    @Type(() => Number)
    pageSize = 0;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    page = 0;
}

export class TimePeriodQueryDto {
    @IsTimestamp()
    @IsOptional()
    startTimestamp?: string;

    @IsOptional()
    @IsTimestamp()
    endTimestamp?: string;
}

import { PaginatedQueryDto } from '@app/common/common.dto';
import { JobLocation, JobStatus, JobType } from '@app/jobs/jobs.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class ListJobsQueryDto extends PaginatedQueryDto {
    @IsOptional()
    @IsEnum(JobLocation)
    location?: JobLocation;

    @IsOptional()
    @IsEnum(JobType)
    type?: JobType;

    @IsOptional()
    @IsEnum(JobStatus)
    status?: JobStatus;
}

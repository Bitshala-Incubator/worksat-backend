import { JobLocation, JobStatus, JobType } from '@app/jobs/jobs.enum';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class ListJobRecord {
    @IsUUID()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    requirements: string;

    @IsEnum(JobLocation)
    location: JobLocation;

    @IsEnum(JobType)
    type: JobType;

    @IsNumber()
    salary: number;

    @IsDateString({ strict: true, strictSeparator: true })
    postedDate: string;

    @IsDateString({ strict: true, strictSeparator: true })
    deadline: string;

    @IsEnum(JobStatus)
    status: JobStatus;

    @IsString()
    @IsOptional()
    applicationInstructions?: string;

    @IsUUID()
    organizationId: string;

    @IsString()
    organizationName: string;

    constructor(partial) {
        Object.assign(this, partial);
    }
}

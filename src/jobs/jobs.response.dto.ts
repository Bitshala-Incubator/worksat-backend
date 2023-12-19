import { Roles, Skills } from '@app/common/common.enums';
import { JobLocation, JobStatus, JobType } from '@app/jobs/jobs.enum';
import {
    ArrayUnique,
    IsArray,
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

    @IsEnum(Skills, { each: true })
    @IsArray()
    @ArrayUnique()
    skills: Skills[];

    @IsEnum(Roles, { each: true })
    @IsArray()
    @ArrayUnique()
    roles: Roles[];

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

import { PaginatedDto } from '@app/common/common.validation-models';
import { Job } from '@app/jobs/job.entity';
import { ListJobsQueryDto } from '@app/jobs/jobs.request.dto';
import { ListJobRecord } from '@app/jobs/jobs.response.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    ) {}

    async listJobs(
        params: ListJobsQueryDto,
    ): Promise<PaginatedDto<ListJobRecord>> {
        const [records, totalRecords] = await this.jobRepository.findAndCount({
            where: {
                ...(params.type && { type: params.type }),
                ...(params.status && { status: params.status }),
                ...(params.location && { location: params.location }),
            },
            relations: {
                organization: true,
            },
            order: {
                createdAt: 'DESC',
            },
            skip: params.pageSize * params.page,
            take: params.pageSize,
        });

        return {
            records: records.map(
                (record): ListJobRecord => ({
                    id: record.id,
                    title: record.title,
                    description: record.description,
                    requirements: record.requirements,
                    location: record.location,
                    type: record.type,
                    salary: record.salary,
                    postedDate: record.createdAt.toISOString(),
                    deadline: record.deadline.toISOString(),
                    status: record.status,
                    applicationInstructions: record.applicationInstructions,
                    organizationId: record.organization.id,
                    organizationName: record.organization.name,
                }),
            ),
            totalRecords,
        };
    }
}

import {
    ApiPaginatedResponse,
    PaginatedDto,
} from '@app/common/common.validation-models';
import { ListJobsQueryDto } from '@app/jobs/jobs.request.dto';
import { ListJobRecord } from '@app/jobs/jobs.response.dto';
import { JobsService } from '@app/jobs/jobs.service';
import {
    Controller,
    Get,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @ApiPaginatedResponse(ListJobRecord)
    @ApiOperation({
        description: 'List jobs',
    })
    @UsePipes(
        new ValidationPipe({
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    )
    @Get()
    async listJobs(
        @Query() query: ListJobsQueryDto,
    ): Promise<PaginatedDto<ListJobRecord>> {
        return this.jobsService.listJobs(query);
    }
}

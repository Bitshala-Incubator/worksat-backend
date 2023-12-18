import { CreateApplicationResponseDto } from '@app/applications/applications.response.dto';
import { ApplicationsService } from '@app/applications/applications.service';
import {
    Controller,
    Param,
    ParseUUIDPipe,
    Post,
    Request,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {}

    @ApiOperation({
        description: 'Create application',
    })
    @Post('apply/:jobId')
    async createApplication(
        @Request() req: Express.Request,
        @Param('jobId', ParseUUIDPipe) jobId: string,
    ): Promise<CreateApplicationResponseDto> {
        return this.applicationsService.createApplication(
            (req as any).user,
            jobId,
        );
    }
}

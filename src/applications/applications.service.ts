import { Application } from '@app/applications/application.entity';
import { CreateApplicationResponseDto } from '@app/applications/applications.response.dto';
import { CommonService } from '@app/common/common.service';
import { Job } from '@app/jobs/job.entity';
import { User } from '@app/users/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ApplicationsService {
    constructor(private readonly commonService: CommonService) {}

    async createApplication(
        user: User,
        jobId: string,
    ): Promise<CreateApplicationResponseDto> {
        const id = await this.commonService.executeDBTransaction<string>(
            async (manager): Promise<string> => {
                const job = await manager.findOne(Job, {
                    where: {
                        id: jobId,
                    },
                });

                if (!job) {
                    throw new NotFoundException(
                        `Job with id ${jobId} not found`,
                    );
                }

                const application = new Application();
                application.user = user;
                application.job = job;

                return (await manager.save(application)).id;
            },
        );

        return {
            id,
        };
    }
}

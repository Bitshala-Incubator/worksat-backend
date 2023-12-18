import { Job } from '@app/jobs/job.entity';
import { JobsController } from '@app/jobs/jobs.controller';
import { JobsService } from '@app/jobs/jobs.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    controllers: [JobsController],
    providers: [JobsService],
    exports: [TypeOrmModule],
})
export class JobsModule {}

import { Job } from '@app/jobs/job.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Job])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class JobsModule {}

import { Application } from '@app/applications/application.entity';
import { ApplicationsController } from '@app/applications/applications.controller';
import { ApplicationsService } from '@app/applications/applications.service';
import { CommonModule } from '@app/common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Application]), CommonModule],
    controllers: [ApplicationsController],
    providers: [ApplicationsService],
    exports: [TypeOrmModule],
})
export class ApplicationsModule {}

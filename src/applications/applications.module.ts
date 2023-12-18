import { Application } from '@app/applications/application.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Application])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class ApplicationsModule {}

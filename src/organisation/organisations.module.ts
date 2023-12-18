import { Organization } from '@app/organisation/organisation.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Organization])],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule],
})
export class OrganisationsModule {}

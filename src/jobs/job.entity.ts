import { Application } from '@app/applications/application.entity';
import { BaseEntity } from '@app/common/common.entities';
import { BigIntTransformer } from '@app/common/common.transformers';
import { JobLocation, JobStatus, JobType } from '@app/jobs/jobs.enum';
import { Organization } from '@app/organisation/organisation.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    requirements: string;

    @Column({ type: 'enum', enum: JobLocation, nullable: false })
    location: JobLocation;

    @Column({ type: 'enum', enum: JobType, nullable: false })
    type: JobType;

    @Column({
        type: 'bigint',
        transformer: BigIntTransformer,
    })
    salary: number;

    @Column({
        type: 'timestamp with time zone',
        nullable: false,
        default: 'now()',
    })
    postedDate: Date;

    @Column({
        type: 'timestamp with time zone',
        nullable: false,
    })
    deadline: Date;

    @Column({ type: 'enum', enum: JobStatus, nullable: false })
    status: JobStatus;

    @Column({ type: 'text', nullable: true })
    applicationInstructions: string;

    @ManyToOne(() => Organization, (organization) => organization.jobs)
    organization: Relation<Organization>;

    @OneToMany(() => Application, (application) => application.job)
    applications: Relation<Application[]>;
}

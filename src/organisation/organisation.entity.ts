import { BaseEntity } from '@app/common/common.entities';
import { Job } from '@app/jobs/job.entity';
import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity()
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    contactPerson: string;

    @Column({ type: 'text', nullable: false })
    contactEmail: string;

    @Column({ type: 'text', nullable: false })
    location: string;

    @Column({ type: 'text', nullable: false })
    industry: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @OneToMany(() => Job, (job) => job.organization)
    jobs: Relation<Job[]>;
}

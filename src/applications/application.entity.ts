import { BaseEntity } from '@app/common/common.entities';
import { Job } from '@app/jobs/job.entity';
import { User } from '@app/users/user.entity';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'timestamp with time zone',
        nullable: false,
        default: 'now()',
    })
    applicationDate: Date;

    @ManyToOne(() => Job, (job) => job.applications)
    job: Relation<Job>;

    @ManyToOne(() => User, (user) => user.applications)
    user: Relation<User>;
}

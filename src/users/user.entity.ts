import { Application } from '@app/applications/application.entity';
import { Gender, Roles, Skills } from '@app/common/common.enums';
import { Availability } from '@app/users/users.enum';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    givenName: string;

    @Column({ type: 'text', nullable: false })
    familyName: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender;

    @Column({ type: 'text', unique: true, nullable: false })
    emailAddress: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Availability, nullable: true })
    availability: Availability;

    @Column({
        type: 'enum',
        enum: Skills,
        array: true,
        nullable: false,
        default: [],
    })
    skills: Skills[];

    @Column({
        type: 'enum',
        enum: Roles,
        array: true,
        nullable: false,
        default: [],
    })
    roles: Roles[];

    @OneToMany(() => Application, (application) => application.user)
    applications: Relation<Application[]>;
}

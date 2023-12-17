import { Column } from 'typeorm';

export class BaseEntity {
    @Column({
        type: 'timestamp with time zone',
        default: () => 'now()',
    })
    createdAt: Date;
}

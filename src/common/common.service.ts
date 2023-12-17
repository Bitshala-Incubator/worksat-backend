import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

@Injectable()
export class CommonService implements OnModuleDestroy {
    private queryRunnerSet: Set<QueryRunner>;
    constructor(private dataSource: DataSource) {
        this.queryRunnerSet = new Set();
    }

    async executeDBTransaction<T>(
        executable: (manager: EntityManager) => Promise<T>,
        isolationLevel: IsolationLevel = 'READ COMMITTED',
    ): Promise<T> {
        const queryRunner = this.dataSource.createQueryRunner();
        this.queryRunnerSet.add(queryRunner);
        await queryRunner.connect();
        await queryRunner.startTransaction(isolationLevel);
        try {
            const result = await executable(queryRunner.manager);
            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            // since we have errors lets rollback the changes we made
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            // you need to release a queryRunner which was manually instantiated
            await queryRunner.release();
            this.queryRunnerSet.delete(queryRunner);
        }
    }

    async onModuleDestroy(): Promise<void> {
        this.queryRunnerSet.forEach(async (queryRunner) => {
            await queryRunner.rollbackTransaction();
        });
    }
}

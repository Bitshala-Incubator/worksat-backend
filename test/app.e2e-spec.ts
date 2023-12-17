import { AppModule } from '@app/app.module';
import { ServiceStatus } from '@app/common/common.enums';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/ (GET)', async () => {
        await request(app.getHttpServer())
            .get('/health')
            .expect(200)
            .expect(ServiceStatus.LIVE);
    });
});

import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ServiceStatus } from '@app/common/common.enums';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it(`should return '${ServiceStatus.LIVE}'`, () => {
            expect(appController.getHealth()).toBe(ServiceStatus.LIVE);
        });
    });
});

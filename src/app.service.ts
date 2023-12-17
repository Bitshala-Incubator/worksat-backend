import { ServiceStatus } from '@app/common/common.enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHealth(): string {
        return ServiceStatus.LIVE;
    }
}

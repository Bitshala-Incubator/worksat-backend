import { AppService } from '@app/app.service';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/health')
    getHealth(): string {
        return this.appService.getHealth();
    }
}

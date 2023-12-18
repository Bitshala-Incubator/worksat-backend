import { AppService } from '@app/app.service';
import { Public } from '@app/authentication/public-route.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @ApiTags('Service Health')
    @ApiOperation({
        description: 'Check health of app',
    })
    @Get('/health')
    getHealth(): string {
        return this.appService.getHealth();
    }
}

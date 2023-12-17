import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

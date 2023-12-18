import { User } from '@app/users/user.entity';
import { UsersController } from '@app/users/users.controller';
import { UsersService } from '@app/users/users.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [TypeOrmModule],
})
export class UsersModule {}

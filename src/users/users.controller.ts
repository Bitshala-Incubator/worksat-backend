import { UserDetailsResponse } from '@app/users/users.response.dto';
import { UsersService } from '@app/users/users.service';
import { Controller, Get, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({
        description: 'Get user details',
    })
    @Get('me')
    async getUserDetails(
        @Request() req: Express.Request,
    ): Promise<UserDetailsResponse> {
        return this.usersService.getUserDetails((req as any).user?.id);
    }
}

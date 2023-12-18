import { UpdateUserDetailsRequest } from '@app/users/users.request.dto';
import { UserDetailsResponse } from '@app/users/users.response.dto';
import { UsersService } from '@app/users/users.service';
import { Body, Controller, Get, Post, Request } from '@nestjs/common';
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

    @ApiOperation({
        description: 'Update user details',
    })
    @Post('me')
    async updateUserDetails(
        @Request() req: Express.Request,
        @Body() body: UpdateUserDetailsRequest,
    ): Promise<UserDetailsResponse> {
        return this.usersService.updateUserDetails((req as any).user?.id, body);
    }
}

import {
    SignInDto,
    SignUpDto,
} from '@app/authentication/authentication.request.dto';
import { AuthResponse } from '@app/authentication/authentication.response.dto';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Public } from '@app/authentication/public-route.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Public()
    @ApiOperation({
        description: 'Sign up a new user',
    })
    @Post('signup')
    async signUp(@Body() body: SignUpDto): Promise<AuthResponse> {
        return this.authService.signUp(body);
    }

    @Public()
    @ApiOperation({
        description: 'Sign in a user',
    })
    @Post('signin')
    async signIn(@Body() body: SignInDto): Promise<AuthResponse> {
        return this.authService.signIn(body);
    }
}

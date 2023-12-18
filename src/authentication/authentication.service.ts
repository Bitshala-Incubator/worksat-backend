import {
    SignInDto,
    SignUpDto,
} from '@app/authentication/authentication.request.dto';
import { AuthResponse } from '@app/authentication/authentication.response.dto';
import { User } from '@app/users/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync, hashSync } from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async signUp(dto: SignUpDto): Promise<AuthResponse> {
        const existingUser = await this.userRepository.findOneBy({
            emailAddress: dto.email,
        });

        if (existingUser) {
            throw new BadRequestException('User already exists!');
        }

        await this.userRepository.insert({
            givenName: dto.givenName,
            familyName: dto.familyName,
            password: this.hashPassword(dto.password),
            emailAddress: dto.email,
        });

        const userEntity = await this.userRepository.findOneBy({
            emailAddress: dto.email,
        });

        return this.generateAuthResponse(userEntity);
    }

    async signIn(dto: SignInDto): Promise<AuthResponse> {
        const user = await this.userRepository.findOneBy({
            emailAddress: dto.email,
        });

        if (!user) {
            throw new BadRequestException('User not found!');
        }

        if (!this.validateUser(dto.password, user.password)) {
            throw new BadRequestException('Invalid password!');
        }

        return this.generateAuthResponse(user);
    }

    private hashPassword(password: string): string {
        return hashSync(password, 10);
    }

    private validateUser(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }

    private async generateAuthResponse(user: User): Promise<AuthResponse> {
        const payload = { sub: user.id, username: user.emailAddress };
        return {
            token: await this.jwtService.signAsync(payload),
            userId: user.id,
        };
    }
}

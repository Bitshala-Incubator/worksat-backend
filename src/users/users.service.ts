import { User } from '@app/users/user.entity';
import { UserDetailsResponse } from '@app/users/users.response.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getUserDetails(userId: string): Promise<UserDetailsResponse> {
        const user = await this.userRepository.findOneBy({
            id: userId,
        });

        if (!user) {
            throw new BadRequestException('User does not exists!');
        }

        return {
            id: user.id,
            givenName: user.givenName,
            familyName: user.familyName,
            emailAddress: user.emailAddress,
            gender: user.gender,
            availability: user.availability,
        };
    }
}

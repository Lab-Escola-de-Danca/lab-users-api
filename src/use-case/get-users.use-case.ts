import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UseCase } from 'src/port/use-case.port';
import { UserRepository } from 'src/port/user-repository.port';

@Injectable()
export class GetUsersUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserDto[]> {
    const users: UserDto[] = await this.userRepository.findAll();
    return users;
  }
}

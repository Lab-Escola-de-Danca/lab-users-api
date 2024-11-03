import { CreatedUserDto } from '../dto/created-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UseCase } from 'src/port/use-case.port';
import { UserRepository } from 'src/port/user-repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const result = await this.userRepository.create(createUserDto);
    return result;
  }
}

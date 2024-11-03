import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreatedUserDto } from 'src/dto/created-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserRepository } from 'src/port/user-repository.port';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: UserDto[] = [];

  async findAll(): Promise<UserDto[]> {
    const users = this.users;
    return users;
  }

  async create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    const createdUserDto: CreatedUserDto = {
      ...createUserDto,
      id: `${this.users.length + 1}`,
    };
    this.users.push(createdUserDto);
    console.log(this.users);
    return createdUserDto;
  }
}

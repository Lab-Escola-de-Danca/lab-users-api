import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreatedUserDto } from 'src/dto/created-user.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserRepository } from 'src/port/user-repository.port';

export class MongoDBUserRepository implements UserRepository {
  findAll(): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }
  create(createUserDto: CreateUserDto): Promise<CreatedUserDto> {
    console.log('User', createUserDto);
    throw new Error('Method not implemented.');
  }
}

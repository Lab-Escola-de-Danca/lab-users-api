import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreatedUserDto } from 'src/dto/created-user.dto';
import { UserDto } from 'src/dto/user.dto';

export abstract class UserRepository {
  abstract create(createUserDto: CreateUserDto): Promise<CreatedUserDto>;
  abstract findAll(): Promise<UserDto[]>;
  abstract delete(id: string): Promise<void>;
  abstract getById(id: string): Promise<CreatedUserDto>;
}

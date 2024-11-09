import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { CreatedUserDto } from './dto/created-user.dto';
import { GetUsersUseCase } from './use-case/get-users.use-case';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly deleteUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreatedUserDto> {
    const createdUserDto = await this.createUserUseCase.execute(createUserDto);
    return createdUserDto;
  }

  @Get()
  async getUsers() {
    const usersDto = await this.getUsersUseCase.execute();
    return usersDto;
  }
  @Get('/:id')
  async getUsersById(@Param('id') id: string) {
    return `getUsers/${id}`;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    try {
      await this.deleteUseCase.execute(id);
    } catch (error: Error | unknown) {
      if ((error as Error).message === 'id not found') {
        throw new ConflictException();
      }
      throw error;
    }
  }
}

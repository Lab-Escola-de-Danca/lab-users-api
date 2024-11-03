import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { CreatedUserDto } from './dto/created-user.dto';
import { GetUsersUseCase } from './use-case/get-users.use-case';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
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
}

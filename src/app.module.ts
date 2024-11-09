import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserRepository } from './port/user-repository.port';
import { GetUsersUseCase } from './use-case/get-users.use-case';
import { InMemoryUserRepository } from './adatper/outgoing/repository/in-memory-user.repository';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
    GetUsersUseCase,
    DeleteUserUseCase,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from './use-case/create-user.use-case';
import { UserRepository } from './port/user-repository.port';
import { InMemoryUserRepository } from './adatper/outcoming/repository/in-memory-user.repository';
import { GetUsersUseCase } from './use-case/get-users.use-case';

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
  ],
})
export class AppModule {}

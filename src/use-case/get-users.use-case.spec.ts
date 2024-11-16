import { createMock } from '@golevelup/ts-jest';
import { UserRepository } from 'src/port/user-repository.port';
import { GetUsersUseCase } from './get-users.use-case';

describe('GetUserUseCase', () => {
  let useCase: GetUsersUseCase;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = createMock<UserRepository>();
    useCase = new GetUsersUseCase(userRepository);
  });
  it('should execute get users from user repository', async () => {
    await useCase.execute();
    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
  });
});

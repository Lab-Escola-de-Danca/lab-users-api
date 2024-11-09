import { UserRepository } from 'src/port/user-repository.port';
import { DeleteUserUseCase } from './delete-user.use-case';
import { faker } from '@faker-js/faker/.';
import { createMock } from '@golevelup/ts-jest';

describe('DeleteUserUseCase', () => {
  let useCase: DeleteUserUseCase;
  let id: string;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = createMock<UserRepository>();
    useCase = new DeleteUserUseCase(userRepository);
  });

  it('should execute delete from user repository for a given id', async () => {
    id = `${Math.random()}fakerId`;
    await useCase.execute(id);
    expect(userRepository.delete).toHaveBeenCalledTimes(1);
    expect(userRepository.delete).toHaveBeenCalledWith(id);
  });

  describe('Errors', () => {
    it('should throw error when user id does not exists', async () => {
      jest.mocked(userRepository).getById.mockResolvedValue(null);
      await expect(() => useCase.execute(faker.string.uuid())).rejects.toThrow(
        /id not found/,
      );
    });
  });
});

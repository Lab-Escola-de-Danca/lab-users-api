import { createMock } from '@golevelup/ts-jest';
import { UserDto } from './dto/user.dto';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let deleteUserUseCase: DeleteUserUseCase;

  beforeEach(() => {
    deleteUserUseCase = createMock<DeleteUserUseCase>();
    userController = new UserController(null, null, deleteUserUseCase);
  });

  describe('deleteUser', () => {
    it('should execute delete use case for a given id', async () => {
      const user: UserDto = {
        id: 'fakeid',
      } as UserDto;

      await userController.deleteUser(user.id);

      expect(deleteUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(deleteUserUseCase.execute).toHaveBeenCalledWith(user.id);
    });
  });
});

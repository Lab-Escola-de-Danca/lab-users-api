import { createMock } from '@golevelup/ts-jest';
import { UserDto } from './dto/user.dto';
import { DeleteUserUseCase } from './use-case/delete-user.use-case';
import { UserController } from './user.controller';
import { GetUsersUseCase } from './use-case/get-users.use-case';

describe('UserController', () => {
  let userController: UserController;
  let deleteUserUseCase: DeleteUserUseCase;
  let getUsersUseCase: GetUsersUseCase;

  beforeEach(() => {
    deleteUserUseCase = createMock<DeleteUserUseCase>();
    getUsersUseCase = createMock<GetUsersUseCase>();
    userController = new UserController(
      null,
      getUsersUseCase,
      deleteUserUseCase,
    );
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

  describe('getUsers', () => {
    it('should execute get users use case', async () => {
      await userController.getUsers();

      expect(getUsersUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});

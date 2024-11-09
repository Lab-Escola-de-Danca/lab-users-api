import { InMemoryUserRepository } from './in-memory-user.repository';

describe('DeleteUserFromUserRepository', () => {
  it('should delete user for a given id', async () => {
    const userRepository = new InMemoryUserRepository();
    const user = await userRepository.create({
      email: 'email@email.com', //TODO: use faker package
      password: 'password',
    });
    await userRepository.create({
      email: 'email2@email.com',
      password: 'password',
    });
    let allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(2);

    await userRepository.delete(user.id);

    allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(1);
    expect(allUsers.at(0).id).not.toEqual(user.id);
  });
});

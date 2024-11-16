import { faker } from '@faker-js/faker/.';
import { InMemoryUserRepository } from './in-memory-user.repository';

describe('InMemoryUserRepository', () => {
  let userRepository: InMemoryUserRepository;
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
  });
  it('should delete user for a given id', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const user = await userRepository.create(userData);
    await userRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    let allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(2);

    await userRepository.delete(user.id);

    allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(1);
    expect(allUsers.at(0).id).not.toEqual(user.id);
  });

  it('should return all users', async () => {
    const numberOfUsers = faker.number.int({ min: 1, max: 10 });
    for (let i = 0; i < numberOfUsers; i++) {
      await userRepository.create({
        email: 'email2@email.com',
        password: 'password',
      });
    }
    const allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(numberOfUsers);
  });

  it('should avoid manipulations on users list outside repository', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    await userRepository.create(userData);
    const allUsers = await userRepository.findAll();

    expect(allUsers).toHaveLength(1);

    allUsers.pop();

    expect(allUsers).toHaveLength(0);

    const allUsers2 = await userRepository.findAll();

    expect(allUsers2).toHaveLength(1);
  });
});

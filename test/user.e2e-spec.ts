import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { AppModule } from 'src/app.module';
import { InMemoryUserRepository } from 'src/adatper/outgoing/repository/in-memory-user.repository';
import { UserRepository } from 'src/port/user-repository.port';
import { CreatedUserDto } from 'src/dto/created-user.dto';

describe('User', () => {
  let app: INestApplication;
  let user: CreatedUserDto;
  let repository: UserRepository;

  beforeAll(async () => {
    repository = new InMemoryUserRepository();
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserRepository)
      .useValue(repository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('POST /user', async () => {
    const userData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    repository.create(userData);
    return request(app.getHttpServer())
      .post('/users')
      .send(userData)
      .expect(HttpStatus.CREATED);
  });

  it('GET /users', async () => {
    const userData = await repository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK);
    expect(response.body).toBeDefined();
    const createdUser = response.body.find(
      (user: CreatedUserDto) => user.id === userData.id,
    );
    expect(createdUser).toBeDefined();
  });
  test.todo('GET /users/:id');
  test.todo('UPDATE /users/:id');

  it(`DELETE users/{id}`, async () => {
    user = await repository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    return request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .expect(HttpStatus.NO_CONTENT);
  });

  describe('Errors', () => {
    it(`DELETE users/{id} - should response with status code 409 when id does not exists`, async () => {
      return request(app.getHttpServer())
        .delete(`/users/${faker.string.uuid()}`)
        .expect(HttpStatus.CONFLICT);
    });
    it(`DELETE users/{id} - should response with status code 500 when an exception occurred`, async () => {
      jest.spyOn(repository, 'getById').mockRejectedValue(new Error('qlq'));
      await request(app.getHttpServer())
        .delete(`/users/${faker.string.uuid()}`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
      jest.mocked(repository).getById.mockReset();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});

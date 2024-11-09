import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/port/use-case.port';
import { UserRepository } from 'src/port/user-repository.port';

@Injectable()
export class DeleteUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<any> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error('id not found');
    }
    await this.userRepository.delete(id);
  }
}

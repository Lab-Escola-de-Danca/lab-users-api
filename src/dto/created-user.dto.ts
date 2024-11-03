import { CreateUserDto } from './create-user.dto';

export type CreatedUserDto = CreateUserDto & {
  id: string;
};

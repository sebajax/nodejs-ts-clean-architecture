import { Expose } from 'class-transformer';

/*
 * create a new user dto
 */
export class CreateUserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
}

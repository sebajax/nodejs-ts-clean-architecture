// Module import
import { Expose } from 'class-transformer';

// Create a new user dto helper for db response
class CreateUserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
}

export { CreateUserDto };

// Module import
import { Expose } from 'class-transformer';

// Query user dto helper for db response
class QueryUserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}

export { QueryUserDto };

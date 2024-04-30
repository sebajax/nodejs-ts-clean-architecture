import { Expose } from 'class-transformer';

/*
 * query user dto
 */
export class QueryUserDto {
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

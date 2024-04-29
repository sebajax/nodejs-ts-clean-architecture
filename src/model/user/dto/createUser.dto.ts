/*
 * create a new user dto
 */

// interface
export interface ICreateUserDTO {
  id: number;
  email: string;
}

// class
export class CreateUserDTO implements ICreateUserDTO {
  id: number;
  email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
}

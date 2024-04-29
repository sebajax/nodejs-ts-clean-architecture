/*
 * find user dto
 */

// interface
export interface IFindUserDTO {
  id: number;
  name: string;
  email: string;
}

// class
export class FindUserDTO implements IFindUserDTO {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

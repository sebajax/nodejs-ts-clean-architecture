/*
 * user domain
 */

// user domain interface
export interface IUserDomain {
  name: string;
  email: string;
}

// user domain class
export class UserDomain implements IUserDomain {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

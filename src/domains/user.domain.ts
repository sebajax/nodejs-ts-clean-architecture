/*
 * user domain
 */

// user domain interface
interface IUserDomain {
  name: string;
  email: string;
}

// user domain class
class UserDomain implements IUserDomain {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

export { IUserDomain, UserDomain };

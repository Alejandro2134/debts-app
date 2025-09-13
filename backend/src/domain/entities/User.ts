interface IUser {
  id?: number;
  email: string;
  password: string;
}

export class User {
  private id?: number;
  private email: string;
  private password: string;

  constructor(item: IUser) {
    this.id = item.id;
    this.email = item.email;
    this.password = item.password;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }
}

export class User {
  name: string;
  banned = false;

  constructor(name: string) {
    this.name = name;
  }
}

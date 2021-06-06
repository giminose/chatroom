import { Hardware } from "./hardware";

export class BusBridge implements Hardware {
  type: string = 'busbridge';
  id: string;
  name: string;

  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

}

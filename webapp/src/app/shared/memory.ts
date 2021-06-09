import { Address } from "./address";
import { Hardware } from "./hardware";

export class Memory implements Hardware {
  type: string = 'MEMORY';
  id: string;
  name: string;
  slaveLocate: Address;
  constructor(options: {
    id: string;
    name: string;
    slaveLocate: Address;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.slaveLocate = options.slaveLocate;
  }
}

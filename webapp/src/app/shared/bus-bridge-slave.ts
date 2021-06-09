import { Address } from "./address";
export class BusBridgeSlave {
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

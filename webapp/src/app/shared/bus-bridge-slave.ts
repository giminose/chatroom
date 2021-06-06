import { AddressRegion } from "./address-region";

export class BusBridgeSlave {
  id: string;
  name: string;
  slaveLocate: AddressRegion;
  constructor(options: {
    id: string;
    name: string;
    slaveLocate: AddressRegion;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.slaveLocate = options.slaveLocate;
  }

}

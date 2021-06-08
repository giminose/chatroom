import { AddressRegion } from "./address-region";
import { BusAddressMap } from "./bus-address-map";
import { Hardware } from "./hardware";

export class Memory implements Hardware {
  type: string = 'MEMORY';
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

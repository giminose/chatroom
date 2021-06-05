import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";

export class Memory implements Hardware {
  type: string = 'memory';
  id: string;
  name: string;
  bus: BUS;
  addressRegion: AddressRegion;
  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    addressRegion: AddressRegion;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.addressRegion = options.addressRegion;
    this.bus = options.bus;
    options.bus.addSlave({type: this.type, id: options.id, name: options.name});
  }
}

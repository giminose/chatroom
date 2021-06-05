import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";
import { Slave } from "./slave";

export class Memory implements Slave {
  type: string = 'memory';
  id: string;
  name: string;
  bus: BUS;
  slaveLocates: Array<AddressRegion>;
  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    slaveLocates: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.slaveLocates = options.slaveLocates;
    this.bus = options.bus;
    options.bus.addSlave({type: this.type, id: options.id, name: options.name});
  }
}

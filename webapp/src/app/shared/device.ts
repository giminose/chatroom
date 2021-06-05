import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Master } from "./master";
import { Memory } from "./memory";
import { Slave } from "./slave";

export class Device implements Master, Slave {
  type = 'device'
  id: string;
  name: string;
  bus: BUS;
  addressViews: Array<AddressRegion>;
  addressRegions: Array<Memory> = [];

  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    addressViews: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.bus = options.bus;
    this.addressViews = options.addressViews;
    this.bus.addMaster({type: this.type, id: options.id, name: options.name});
  }

  asSlave(memory: Memory) {
    this.addressRegions.push(memory);
    this.bus.addSlave({type: this.type, id: memory.id, name: memory.name});
  }
}

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
  masterViews: Array<AddressRegion>;
  slaveLocates: Array<AddressRegion> = [];

  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    masterViews: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.bus = options.bus;
    this.masterViews = options.masterViews;
    this.bus.addMaster({type: this.type, id: options.id, name: options.name});
  }

  asSlave(memory: AddressRegion) {
    this.slaveLocates.push(memory);
  }
}

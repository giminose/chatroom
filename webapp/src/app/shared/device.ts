import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";
import { Master } from "./master";
import { Memory } from "./memory";
import { Slave } from "./slave";

export class Device implements Master, Slave {
  type = 'device'
  id: string;
  name: string;
  masterViews: {
    busID: string;
    addressViews: AddressRegion[];
  };
  slaveLocates: Array<AddressRegion> = [];

  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    masterViews: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.masterViews = {
      busID: options.bus.id,
      addressViews: options.masterViews
    }
    options.bus.addMaster(this);
  }

  asSlave(memory: AddressRegion, bus: BUS) {
    this.slaveLocates.push(memory);
    bus.addSlave(this)
  }
}

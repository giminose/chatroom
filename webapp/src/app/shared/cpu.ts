import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Master } from "./master";

export class CPU implements Master {
  type = 'cpu';
  id: string;
  name: string;
  bus: BUS;
  addressViews: Array<AddressRegion>;

  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    addressViews: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name
    this.bus = options.bus;
    this.addressViews = options.addressViews;
    options.bus.addMaster({type: this.type, id: options.id, name: options.name});
  }
}

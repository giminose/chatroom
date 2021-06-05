import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Master } from "./master";

export class CPU implements Master {
  type = 'cpu';
  id: string;
  name: string;
  masterViews: {
    busID: string;
    addressViews: AddressRegion[];
  };
  constructor(options: {
    id: string;
    name: string;
    bus: BUS;
    masterViews: Array<AddressRegion>;
  }) {
    this.id = options.id;
    this.name = options.name
    this.masterViews = {
      busID: options.bus.id,
      addressViews: options.masterViews
    }
    options.bus.addMaster(this);
  }
}

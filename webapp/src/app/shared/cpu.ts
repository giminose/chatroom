import { BusAddressMap } from "./bus-address-map";
import { Hardware } from "./hardware";
export class CPU implements Hardware{
  type = 'CPU';
  id: string;
  name: string;
  masterView: BusAddressMap;

  constructor(options: {
    id: string;
    name: string;
    busAddress: BusAddressMap
  }) {
    this.id = options.id;
    this.name = options.name
    this.masterView = options.busAddress;
    this.masterView.bus.addMaster(this);
  }

}

import { AddressRegion } from "./address-region";
import { BusAddressMap } from "./bus-address-map";
import { Hardware } from "./hardware";

export class Device implements Hardware {
  type = 'DEVICE'
  id: string;
  name: string;
  masterView?: BusAddressMap;
  slaveLocate?: AddressRegion;

  constructor(options: {
    id: string;
    name: string;
    masterView?: BusAddressMap;
    slaveLocate?: AddressRegion;
  }) {
    this.id = options.id;
    this.name = options.name;
    if (options.masterView != null) {
      this.masterView = options.masterView;
    }
    if (options.slaveLocate != null) {
      this.slaveLocate = options.slaveLocate;
    }
  }
}

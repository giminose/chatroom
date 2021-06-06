import { BusAddressMap } from "./bus-address-map";

export class BusBridgeMaster {
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
  }

}

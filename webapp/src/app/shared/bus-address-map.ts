import { AddressRegion } from "./address-region";
import { BUS } from "./bus";

export class BusAddressMap {
  bus: BUS;
  address: AddressRegion[] = [];

  constructor(options: {
    bus: BUS,
    address: AddressRegion[]
  }) {
    this.bus = options.bus;
    this.address = options.address;
  }
}

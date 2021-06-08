import { AddressRegion } from "./address-region";
import { BUS } from "./bus";

export class BusAddressMap {
  bus: string;
  address: AddressRegion[] = [];

  constructor(options: {
    bus: BUS,
    address: AddressRegion[]
  }) {
    this.bus = options.bus.id;
    this.address = options.address;
  }
}

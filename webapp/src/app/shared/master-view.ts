import { Address } from "./address";
import { BUS } from "./bus";

export class MasterView {
  bus: string;
  address: Address[] = [];

  constructor(options: {
    bus: BUS,
    address: Address[]
  }) {
    this.bus = options.bus.id;
    this.address = options.address;
  }
}

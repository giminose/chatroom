import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";
import { Master } from "./master";
import { Slave } from "./slave";

export class BusBridge implements Master, Slave{
  type: string = 'busbridge';
  id: string;
  name: string;
  bus!: BUS;
  masterViews: { bus: Hardware; addressViews: AddressRegion[]; };
  slaveLocates: AddressRegion[] = [];

  constructor(options: {
    id: string;
    name: string;
    masterViews: { bus: Hardware; addressViews: AddressRegion[]; };
  }) {
    this.id = options.id;
    this.name = options.name;
    this.masterViews = options.masterViews;
  }

}

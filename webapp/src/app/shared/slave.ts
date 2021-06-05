import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";
import { Memory } from "./memory";

export interface Slave extends Hardware {
  slaveLocates: Array<AddressRegion>;
}

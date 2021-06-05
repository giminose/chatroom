import { AddressRegion } from "./address-region";
import { Hardware } from "./hardware";
import { Memory } from "./memory";

export interface Slave extends Hardware {
  addressRegions: Array<Memory>;
}

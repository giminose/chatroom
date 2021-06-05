import { AddressRegion } from "./address-region";
import { BUS } from "./bus";
import { Hardware } from "./hardware";

export interface Master extends Hardware {
  bus: BUS;
  masterViews: Array<AddressRegion>;
}

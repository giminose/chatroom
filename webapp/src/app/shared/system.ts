import { BUS } from "./bus";
import { Hardware } from "./hardware";

export class SingleCoreSystem {
  bus: Array<BUS> = [];
  devices: Array<Hardware> = [];
}

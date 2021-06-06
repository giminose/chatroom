import { BusBridgeMaster } from "./bus-bridge-master";
import { BusBridgeSlave } from "./bus-bridge-slave";

export class BusBridgeMapper {
  master: BusBridgeMaster;
  slave: BusBridgeSlave;

  constructor(master: BusBridgeMaster, slave: BusBridgeSlave) {
    this.master = master;
    this.slave = slave;
  }
}

import { BusBridgeMaster } from "./bus-bridge-master";
import { BusBridgeSlave } from "./bus-bridge-slave";

export class BusBridgeMapper {
  master: string;
  slave: string;

  constructor(master: BusBridgeMaster, slave: BusBridgeSlave) {
    this.master = master.id;
    this.slave = slave.id;
  }
}

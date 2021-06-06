import { BusBridgeMapper } from "./bus-bridge-mapper";
import { BusBridgeMaster } from "./bus-bridge-master";
import { BusBridgeSlave } from "./bus-bridge-slave";
import { Hardware } from "./hardware";

export class BusBridge implements Hardware {
  type: string = 'BUS_BRIDGE';
  id: string;
  name: string;
  masters: BusBridgeMaster[];
  slaves: BusBridgeSlave[];
  mapper: BusBridgeMapper[];

  constructor(options: {
    id: string;
    name: string;
    masters: BusBridgeMaster[];
    slaves: BusBridgeSlave[];
    mapper: BusBridgeMapper[];
  }) {
    this.id = options.id;
    this.name = options.name;
    this.masters = options.masters;
    this.slaves = options.slaves;
    this.mapper = options.mapper;
  }

}

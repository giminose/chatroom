import { BusBridgeMapper } from "./bus-bridge-mapper";
import { Port } from "./port";

export class BusBridge {
  type = 'BUSBRIDGE'
  id: string;
  name: string;
  outMasterPorts: string[] = [];
  inSlavePorts: string[] = [];
  mapper: BusBridgeMapper[] = [];

  constructor(options: {
    id: string;
    name: string;
    masterPorts: Port[];
    slavePorts: Port[];
  }) {
    this.id = options.id;
    this.name = options.name;
    options.masterPorts.forEach(m => {
      this.outMasterPorts.push(m.id);
    });
    options.slavePorts.forEach(m => {
      this.inSlavePorts.push(m.id);
    });
  }

}

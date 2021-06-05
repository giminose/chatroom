import { BUS } from "./bus";
import { CPU } from "./cpu";
import { Device } from "./device";
import { Hardware } from "./hardware";
import { Memory } from "./memory";

export class SingleCoreSystem {
  id = '';
  name = '';
  bus: BUS[] = [];
  cpu!: CPU;
  memories: Memory[] = [];
  devices: Device[] = [];

  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  addHardwares(hwList: Hardware[]) {
    hwList.forEach(v => {
      if (v.type === 'bus') {
        this.bus.push(<BUS>v);
      }
      if (v.type === 'memory') {
        this.memories.push(<Memory>v);
      }
      if (v.type === 'device') {
        this.devices.push(<Device>v);
      }
      if (v.type === 'cpu') {
        this.cpu = <CPU>v;
      }
    })
  }
}

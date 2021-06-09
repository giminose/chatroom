import { BUS } from "./bus";
import { BusBridge } from "./bus-bridge";
import { CPU } from "./cpu";
import { Device } from "./device";
import { Hardware } from "./hardware";
import { Memory } from "./memory";

export class SingleCpuSystem {
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
    hwList.forEach(hw => {
      if (hw.type === 'BUS') {
        this.bus.push(<BUS>hw);
      }
      if (hw.type === 'MEMORY') {
        this.memories.push(<Memory>hw);
      }
      if (hw.type === 'DEVICE') {
        this.devices.push(<Device>hw);
      }
      if (hw.type === 'CPU') {
        this.cpu = <CPU>hw;
      }
    })
  }
}

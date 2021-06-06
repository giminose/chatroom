import { Hardware } from "./hardware";

export class BUS implements Hardware {
  type: string = 'bus';
  id: string;
  name: string;
  masters: Hardware[] = [];
  slaves: Hardware[] = [];
  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  addMaster(hw: Hardware) {
    if (!this.masters.find(v => v.id == hw.id)) {
      this.masters.push({
        type: hw.type,
        id: hw.id,
        name: hw.name
      });
    }
  }

  addSlave(hw: Hardware) {
    if (!this.slaves.find(v => v.id == hw.id)) {
      this.slaves.push({
        type: hw.type,
        id: hw.id,
        name: hw.name
      });
    }
  }
}

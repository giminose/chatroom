import { Hardware } from "./hardware";

export class BUS implements Hardware {
  type: string = 'BUS';
  id: string;
  name: string;
  masters: string[] = [];
  slaves: string[] = [];
  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  addMaster(hw: Hardware) {
    if (!this.masters.find(v => v == hw.id)) {
      this.masters.push(hw.id);
    }
  }

  addSlave(hw: Hardware) {
    if (!this.slaves.find(v => v == hw.id)) {
      this.slaves.push(hw.id);
    }
  }
}

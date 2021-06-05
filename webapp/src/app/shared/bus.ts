import { Hardware } from "./hardware";

export class BUS implements Hardware {
  type: string = 'bus';
  id: string;
  name: string;
  masterIDs: string[] = [];
  slaveIDs: string[] = [];
  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  addMaster(hw: Hardware) {
    if (!this.masterIDs.find(v => v == hw.id)) {
      this.masterIDs.push(hw.id)
    }
  }

  addSlave(hw: Hardware) {
    if (!this.slaveIDs.find(v => v == hw.id)) {
      this.slaveIDs.push(hw.id)
    }
  }
}

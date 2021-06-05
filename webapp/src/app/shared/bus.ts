import { Hardware } from "./hardware";

export class BUS implements Hardware {
  type: string = 'bus';
  id: string;
  name: string;
  master: Array<Hardware> = [];
  slave: Array<Hardware> = [];
  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  addMaster(hw: Hardware) {
    this.master.push(hw);
  }

  addSlave(hw: Hardware) {
    this.slave.push(hw)
  }
}

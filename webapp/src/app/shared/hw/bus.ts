import { Port } from "./port";
export class BUS {
  type = 'BUS';
  id: string;
  name: string;
  masterPorts: string[] = [];
  slavePorts: string[] = [];

  constructor(options: {
    id: string;
    name: string;
  }) {
    this.id = options.id;
    this.name = options.name;
  }

  getAllPorts() {
    return this.masterPorts.concat(this.slavePorts);
  }

  addMasterPort(port: Port, allPort: Port[]) {
    if (!this.masterPorts.find(v => v == port.id)) {
      this.masterPorts.push(port.id);
      allPort.push(port);
    }
  }

  addSlavePort(port: Port, allPort: Port[]) {
    if (!this.slavePorts.find(v => v == port.id)) {
      this.slavePorts.push(port.id);
      allPort.push(port);
    }
  }
}

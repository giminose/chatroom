import { Port } from "./port";
export class Device {
  type = 'DEVICE'
  id: string;
  name: string;
  masterPorts: string[] = [];
  slavePorts: string[] = [];

  constructor(options: {
    id: string;
    name: string;
    masterPorts: Port[],
    slavePorts: Port[]
  }) {
    this.id = options.id;
    this.name = options.name;
    options.masterPorts.forEach(m => {
      if (!this.masterPorts.find(v => v == m.id)) {
        this.masterPorts.push(m.id);
      }
    })
    options.slavePorts.forEach(s => {
      if (!this.slavePorts.find(v => v == s.id)) {
        this.slavePorts.push(s.id);
      }
    })
  }
}

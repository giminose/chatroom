import { Port } from "./port";
export class CPU {
  type = 'CPU';
  id: string;
  name: string;
  ports: string[] = [];

  constructor(options: {
    id: string;
    name: string;
    ports: Port[];
  }) {
    this.id = options.id;
    this.name = options.name;
    options.ports.forEach(p => {
      if (!this.ports.find(v => v == p.id)) {
        this.ports.push(p.id);
      }
    })
  }
}

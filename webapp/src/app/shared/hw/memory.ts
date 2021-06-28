import { Address } from "./address";
import { MemMapper } from "./mem-mapper";
import { Port } from "./port";
export class Memory {
  type = 'MEMORY';
  id: string;
  name: string;
  physical: Address;
  mapper: MemMapper[] = [];
  constructor(options: {
    id: string;
    name: string;
    physical: Address;
  }) {
    this.id = options.id;
    this.name = options.name;
    this.physical = options.physical;
  }

  addMapper(req: Address, res: Address) {
    const memMapper = new MemMapper(req, res);
    this.mapper.push(memMapper);
  }

}

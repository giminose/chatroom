import { Address } from "./address";

export class MemMapper {
  req: Address;
  res: Address;
  constructor(req: Address, res: Address) {
    this.req = req;
    this.res = res;
  }
}

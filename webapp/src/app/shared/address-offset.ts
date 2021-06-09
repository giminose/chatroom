import { Address } from "./address";

export class AddressOffset implements Address {
  start: string;
  offset: string;
  size: string;

  constructor(options: {
    start: string;
    offset: string
    size: string;
  }) {
    this.start = options.start;
    this.offset = options.offset;
    this.size = options.size;
  }

}

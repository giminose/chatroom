import { Address } from "./address";

export class AddressRegion implements Address{
  start: string;
  end: string;

  constructor(options: {
    start: string;
    end: string;
  }) {
    this.start = options.start;
    this.end = options.end;
  }
}

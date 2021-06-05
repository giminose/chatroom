export class AddressRegion {
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

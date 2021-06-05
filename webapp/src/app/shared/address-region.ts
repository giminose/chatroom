export class AddressRegion {
  start: number;
  end: number;

  constructor(options: {
    start: number;
    end: number;
  }) {
    this.start = options.start;
    this.end = options.end;
  }
}

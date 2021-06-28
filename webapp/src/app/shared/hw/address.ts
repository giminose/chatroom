export class Address {
  start: string;
  offset: string;
  end: string;

  constructor(options: {
    start: string;
    offset: string;
    end: string;
  }) {
    this.start = options.start;
    this.offset = options.offset;
    this.end = options.end;
  }
}

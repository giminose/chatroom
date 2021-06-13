export class Address {
  type: 'OFFSET' | 'REGION';
  start: string;
  offset: string;
  limit: string;

  constructor(options: {
    type: 'OFFSET' | 'REGION';
    start: string;
    offset: string;
    limit: string;
  }) {
    this.type = options.type;
    this.start = options.start;
    this.offset = options.offset;
    this.limit = options.limit;
  }
}

import { Address } from "./address";

export class Port {
  id: string;
  name: string;
  adrRegions: Address[];

  constructor(id: string, name: string, adrRegions: Address[]) {
    this.id = id;
    this.name = name,
    this.adrRegions = adrRegions;
  }
}

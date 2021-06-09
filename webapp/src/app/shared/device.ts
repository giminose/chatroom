import { MasterView } from "./master-view";
import { Hardware } from "./hardware";
import { Address } from "./address";

export class Device implements Hardware {
  type = 'DEVICE'
  id: string;
  name: string;
  masterView?: MasterView;
  slaveLocate?: Address;

  constructor(options: {
    id: string;
    name: string;
    masterView?: MasterView;
    slaveLocate?: Address;
  }) {
    this.id = options.id;
    this.name = options.name;
    if (options.masterView != null) {
      this.masterView = options.masterView;
    }
    if (options.slaveLocate != null) {
      this.slaveLocate = options.slaveLocate;
    }
  }
}

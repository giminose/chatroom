import { MasterView } from "./master-view";

export class BusBridgeMaster {
  id: string;
  name: string;
  masterView: MasterView;

  constructor(options: {
    id: string;
    name: string;
    busAddress: MasterView
  }) {
    this.id = options.id;
    this.name = options.name
    this.masterView = options.busAddress;
  }

}

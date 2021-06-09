import { MasterView } from "./master-view";
import { Hardware } from "./hardware";
export class CPU implements Hardware{
  type = 'CPU';
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

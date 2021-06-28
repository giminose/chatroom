import { Address } from "./address";
import { Port } from "./port";

export class BusBridgeMapper {
  outMasterPort: string ;
  inSlavePorts: string;
  reqAddr: Address;
  resAddr: Address;

  constructor(options: {
    masterPort: Port;
    slavePort: Port;
    reqAddr: Address;
    resAddr: Address;
  }) {
    this.outMasterPort = options.masterPort.id;
    this.inSlavePorts = options.slavePort.id;
    this.reqAddr = options.reqAddr;
    this.resAddr = options.resAddr;
  }

}

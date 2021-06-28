import { Injectable } from '@angular/core';
import { Address } from './address';
import { BUS } from './bus';
import { BusBridge } from './bus-bridge';
import { BusBridgeMapper } from './bus-bridge-mapper';
import { CPU } from './cpu';
import { Device } from './device';
import { Memory } from './memory';
import { Port } from './port';

@Injectable({
  providedIn: 'root'
})
export class HwService {

  constructor() { }

  generateComponent() {
    const topBUS = new BUS({id: 'bus_0', name: 'top_bus'});
    const s1BUS = new BUS({id: 'bus_1', name: 's1_bus'});
    const s2BUS = new BUS({id: 'bus_2', name: 's2_bus'});
    const buses: BUS[] = [topBUS, s1BUS, s2BUS];

    const arDDR = new Address({start: '0x00000000', offset: '0x0', end: '0xFFFFFFFF'}); // 0~4G
    const arTopDDR   = new Address({start: '0x80000000', offset: '0x0', end: '0xFFFFFFFF'}); // 2G~4G
    const arEngView  = new Address({start: '0x000FFFFF', offset: '0x0', end: '0x001FFFFF'}); // 0~2M
    const arSubBufA  = new Address({start: '0x00000000', offset: '0x0', end: '0x000FFFFF'}); // 0M~1M
    const arSubBufB  = new Address({start: '0x00100000', offset: '0x0', end: '0x001FFFFF'}); // 1M~2M
    const arEngAReg  = new Address({start: '0x00A00000', offset: '0x0', end: '0x00A03FFF'}); // 10M~10+16K
    const arEngBReg  = new Address({start: '0x00A04000', offset: '0x0', end: '0x00A07FFF'}); // 10M+16K~10M+32K
    const arSubDDR   = new Address({start: '0xC0000000', offset: '0x0', end: '0xFFFFFFFF'}); // 3G~4G
    const arT2S1BufA = new Address({start: '0x10000000', offset: '0x0', end: '0x100FFFFF'}); // 256M~257M
    const arT2S1BufB = new Address({start: '0x10100000', offset: '0x0', end: '0x101FFFFF'}); // 257M~258M
    const arT2S1DDR  = new Address({start: '0x40000000', offset: '0x20000000', end: '0x5FFFFFFF'}); // 1G~1.5G
    const arT2S2BufA = new Address({start: '0x20000000', offset: '0x0', end: '0x200FFFFF'}); // 512M~513M
    const arT2S2BufB = new Address({start: '0x20100000', offset: '0x0', end: '0x201FFFFF'}); // 513M~514M
    const arT2S2DDR  = new Address({start: '0x60000000', offset: '0x20000000', end: '0x7FFFFFFF'}); // 1.5G~2G

    const topCpuPort = new Port('port_0', 'top_cpu_port', [arDDR]);
    const topDDRPort = new Port('port_1', 'top_ddr', [arTopDDR]);
    const s1CpuPort = new Port('port_2', 's1_cpu_port', [arDDR]);
    const s1DDRPort = new Port('port_3', 's1_ddr_port', [arSubDDR]);
    const s2CpuPort = new Port('port_4', 's2_cpu_port', [arDDR]);
    const s2DDRPort = new Port('port_5', 's2_ddr_port', [arSubDDR]);

    const s1BufAPort = new Port('port_6', 's1_buf_a_port', [arSubBufA]);
    const s1BufBPort = new Port('port_7', 's1_buf_b_port', [arSubBufB]);
    const s1EnARegPort = new Port('port_8', 's1_en_a_port', [arEngAReg]);
    const s1EnBRegPort = new Port('port_9', 's1_en_b_port', [arEngBReg]);
    const s1EnAViewPort = new Port('port_10', 's1_en_a_view_port', [arEngView, arSubDDR]);
    const s1EnBViewPort = new Port('port_11', 's1_en_b_view_port', [arEngView]);

    const s2BufAPort = new Port('port_12', 's2_buf_a_port', [arSubBufA]);
    const s2BufBPort = new Port('port_13', 's2_buf_b_port', [arSubBufB]);
    const s2EnARegPort = new Port('port_14', 's2_en_a_port', [arEngAReg]);
    const s2EnBRegPort = new Port('port_15', 's2_en_b_port', [arEngBReg]);
    const s2EnAViewPort = new Port('port_16', 's2_en_a_view_port', [arEngView, arSubDDR]);
    const s2EnBViewPort = new Port('port_17', 's2_en_b_view_port', [arEngView]);

    const t2s1SlavePort = new Port('port_18', 't2s1_slave_port', [arT2S1BufA, arT2S1BufB, arT2S1DDR]);
    const t2s1MasterPort = new Port('port_19', 't2s1_master_port', [arSubBufA, arSubBufB, arSubDDR]);

    const s12tSlavePort = new Port('port_20', 's12t_slave_port', [arSubBufA, arSubBufB, arSubDDR]);
    const s12tMasterPort = new Port('port_21', 's12t_master_port', [arT2S1BufA, arT2S1BufB, arT2S1DDR]);

    const t2s2SlavePort = new Port('port_22', 't2s2_slave_port', [arT2S2BufA, arT2S2BufB, arT2S2DDR]);
    const t2s2MasterPort = new Port('port_23', 't2s2_master_port', [arSubBufA, arSubBufB, arSubDDR]);

    const s22tSlavePort = new Port('port_24', 's22t_slave_port', [arSubBufA, arSubBufB, arSubDDR]);
    const s22tMasterPort = new Port('port_25', 's22t_master_port', [arT2S2BufA, arT2S2BufB, arT2S2DDR]);

    const ports: Port[] = [];
    topBUS.addMasterPort(topCpuPort, ports);
    topBUS.addMasterPort(s12tMasterPort, ports);
    topBUS.addMasterPort(s22tMasterPort, ports);

    topBUS.addSlavePort(t2s1SlavePort, ports);
    topBUS.addSlavePort(topDDRPort, ports);
    topBUS.addSlavePort(t2s2SlavePort, ports);

    s1BUS.addMasterPort(s1CpuPort, ports);
    s1BUS.addMasterPort(s1EnAViewPort, ports);
    s1BUS.addMasterPort(s1EnBViewPort, ports);
    s1BUS.addMasterPort(t2s1MasterPort, ports);

    s1BUS.addSlavePort(s12tSlavePort, ports);
    s1BUS.addSlavePort(s1BufAPort, ports);
    s1BUS.addSlavePort(s1BufBPort, ports);
    s1BUS.addSlavePort(s1EnARegPort, ports);
    s1BUS.addSlavePort(s1EnBRegPort, ports);
    s1BUS.addSlavePort(s1DDRPort, ports);

    s2BUS.addMasterPort(s2CpuPort, ports);
    s2BUS.addMasterPort(s2EnAViewPort, ports);
    s2BUS.addMasterPort(s2EnBViewPort, ports);
    s2BUS.addMasterPort(t2s2MasterPort, ports);

    s2BUS.addSlavePort(s22tSlavePort, ports);
    s2BUS.addSlavePort(s2BufAPort, ports);
    s2BUS.addSlavePort(s2BufBPort, ports);
    s2BUS.addSlavePort(s2EnARegPort, ports);
    s2BUS.addSlavePort(s2EnBRegPort, ports);
    s2BUS.addSlavePort(s2DDRPort, ports);

    const topCPU = new CPU({
      id: 'cpu_0', name: 'TCPU',
      ports: [topCpuPort]
    });
    const s1Cpu = new CPU({
      id: 'cpu_1', name: 'S1CPU',
      ports: [s1CpuPort]
    });
    const s2Cpu = new CPU({
      id: 'cpu_2', name: 'S2CPU',
      ports: [s2CpuPort]
    });
    const cpus: CPU[] = [topCPU, s1Cpu, s2Cpu];

    const s1EngA = new Device({
      id: 'dev_0', name: 'Engin1A',
      masterPorts: [s1EnAViewPort],
      slavePorts: [s1BufAPort, s1EnARegPort]
    })
    const s1EngB = new Device({
      id: 'dev_1', name: 'Engin1B',
      masterPorts: [s1EnBViewPort],
      slavePorts: [s1BufBPort, s1EnBRegPort]
    })
    const s2EngA = new Device({
      id: 'dev_2', name: 'Engin2A',
      masterPorts: [s2EnAViewPort],
      slavePorts: [s2BufAPort, s2EnARegPort]
    });
    const s2EngB = new Device({
      id: 'dev_3', name: 'Engin2B',
      masterPorts: [s2EnBViewPort],
      slavePorts: [s2BufBPort, s2EnBRegPort]
    });
    const devices: Device[] = [s1EngA, s1EngB, s2EngA, s2EngB];

    const topDDR = new Memory({id: 'mem_0', name: 'TDDR', physical: arDDR});
    topDDR.addMapper(arT2S1BufA, arT2S1BufA);
    topDDR.addMapper(arT2S1BufB, arT2S1BufB);
    topDDR.addMapper(arT2S2BufA, arT2S2BufA);
    topDDR.addMapper(arT2S2BufB, arT2S2BufB);
    topDDR.addMapper(arT2S1DDR, arT2S2BufB);
    topDDR.addMapper(arTopDDR, arTopDDR);
    const T2S1DDR  = new Address({start: '0x40000000', offset: '0x0', end: '0x5FFFFFFF'}); // 1G~1.5G
    topDDR.addMapper(T2S1DDR, T2S1DDR)
    const T2S2DDR  = new Address({start: '0x60000000', offset: '0x0', end: '0x7FFFFFFF'}); // 1.5G~2G
    topDDR.addMapper(T2S2DDR, T2S2DDR)

    const s1DDR = new Memory({id: 'mem_1', name: 'S1DDR', physical: arDDR});
    s1DDR.addMapper(arSubBufA, arSubBufA);
    s1DDR.addMapper(arSubBufB, arSubBufB);
    s1DDR.addMapper(arEngAReg, arEngAReg);
    s1DDR.addMapper(arEngBReg, arEngBReg);
    s1DDR.addMapper(arSubDDR, arSubDDR);

    const s2DDR = new Memory({id: 'mem_2', name: 'S2DDR', physical: arDDR});
    s2DDR.addMapper(arSubBufA, arSubBufA);
    s2DDR.addMapper(arSubBufB, arSubBufB);
    s2DDR.addMapper(arEngAReg, arEngAReg);
    s2DDR.addMapper(arEngBReg, arEngBReg);
    s2DDR.addMapper(arSubDDR, arSubDDR);
    const mems: Memory[] = [topDDR, s1DDR, s2DDR];

    const t2s1BB = new BusBridge({
      id: 'bb_0', name: 't2s1_bridge',
      masterPorts: [t2s1MasterPort, s12tMasterPort], slavePorts: [t2s1SlavePort, s12tSlavePort]
    });

    const t2s1bbMapper1 = new BusBridgeMapper({
      masterPort: t2s1MasterPort, slavePort: t2s1SlavePort,
      reqAddr: t2s1SlavePort.adrRegions[0], resAddr: t2s1MasterPort.adrRegions[0]
    });
    const t2s1bbMapper2 = new BusBridgeMapper({
      masterPort: t2s1MasterPort, slavePort: t2s1SlavePort,
      reqAddr: t2s1SlavePort.adrRegions[1], resAddr: t2s1MasterPort.adrRegions[1]
    });
    const t2s1bbMapper3 = new BusBridgeMapper({
      masterPort: t2s1MasterPort, slavePort: t2s1SlavePort,
      reqAddr: t2s1SlavePort.adrRegions[2], resAddr: t2s1MasterPort.adrRegions[2]
    });
    const t2s1bbMapper4 = new BusBridgeMapper({
      masterPort: s12tMasterPort, slavePort: s12tSlavePort,
      reqAddr: s12tSlavePort.adrRegions[0], resAddr: s12tMasterPort.adrRegions[0]
    });
    const t2s1bbMapper5 = new BusBridgeMapper({
      masterPort: s12tMasterPort, slavePort: s12tSlavePort,
      reqAddr: s12tSlavePort.adrRegions[1], resAddr: s12tMasterPort.adrRegions[1]
    });
    const t2s1bbMapper6 = new BusBridgeMapper({
      masterPort: s12tMasterPort, slavePort: s12tSlavePort,
      reqAddr: s12tSlavePort.adrRegions[2], resAddr: s12tMasterPort.adrRegions[2]
    });
    t2s1BB.mapper = [t2s1bbMapper1, t2s1bbMapper2, t2s1bbMapper3, t2s1bbMapper4, t2s1bbMapper5, t2s1bbMapper6]

    const t2s2BB = new BusBridge({
      id: 'bb_1', name: 't2s2_bridge',
      masterPorts: [t2s2MasterPort, s22tMasterPort], slavePorts: [t2s2SlavePort, s22tSlavePort]
    });
    const t2s2bbMapper1 = new BusBridgeMapper({
      masterPort: t2s2MasterPort, slavePort: t2s2SlavePort,
      reqAddr: t2s2SlavePort.adrRegions[0], resAddr: t2s2MasterPort.adrRegions[0]
    });
    const t2s2bbMapper2 = new BusBridgeMapper({
      masterPort: t2s2MasterPort, slavePort: t2s2SlavePort,
      reqAddr: t2s2SlavePort.adrRegions[1], resAddr: t2s2MasterPort.adrRegions[1]
    });
    const t2s2bbMapper3 = new BusBridgeMapper({
      masterPort: t2s2MasterPort, slavePort: t2s2SlavePort,
      reqAddr: t2s2MasterPort.adrRegions[2], resAddr: t2s2SlavePort.adrRegions[2]
    });
    const t2s2bbMapper4 = new BusBridgeMapper({
      masterPort: s22tMasterPort, slavePort: s22tSlavePort,
      reqAddr: s22tSlavePort.adrRegions[0], resAddr: s22tMasterPort.adrRegions[0]
    });
    const t2s2bbMapper5 = new BusBridgeMapper({
      masterPort: s22tMasterPort, slavePort: s22tSlavePort,
      reqAddr: s22tSlavePort.adrRegions[1], resAddr: s22tMasterPort.adrRegions[1]
    });
    const t2s2bbMapper6 = new BusBridgeMapper({
      masterPort: s22tMasterPort, slavePort: s22tSlavePort,
      reqAddr: s22tSlavePort.adrRegions[2], resAddr: s22tMasterPort.adrRegions[2]
    });
    t2s1BB.mapper = [t2s1bbMapper1, t2s1bbMapper2, t2s1bbMapper3]

    const bbs: BusBridge[] = [t2s1BB, t2s2BB];

    console.log(ports);
    console.log(buses);
    console.log(cpus);
    console.log(devices);
    console.log(mems);
    console.log(bbs);

    return JSON.stringify({
      ports: ports,
      buses: buses,
      cpus: cpus,
      mems: mems,
      devs: devices,
      bbs: bbs
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs/esm6/client';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { Message } from '@stomp/stompjs/esm6/i-message';
import { BUS } from './shared/bus';
import { CPU } from './shared/cpu';
import { AddressRegion } from './shared/address-region';
import { Device } from './shared/device';
import { Memory } from './shared/memory';
import { SingleCoreSystem } from './shared/single-core-system';
import { BusAddressMap } from './shared/bus-address-map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string = '';
  private client = new Client();
  private subscription: StompSubscription = new StompSubscription();
  constructor() {

  }
  ngOnInit(): void {
   this.generateComponent();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/chatroom',
      connectHeaders: {
        login: 'user',
        passcode: 'password',
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      console.log('Connected: ' + frame);
      this.setConnected(true)
      this.subscription = this.client.subscribe('/conversation/welcome', (message) => this.showGreeting(message))
    };

    this.client.onStompError = (frame) => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client != null) {
      this.client.deactivate();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.client.publish({
      destination: '/chat/join',
      body: JSON.stringify({ name: this.name}),
      headers: { priority: '9' }
    });
  }

  showGreeting(message: Message) {
    this.greetings.push(JSON.parse(message.body).content);
  }

  generateComponent() {
    const topBUS = new BUS({id: 'bus_0', name: 'top_bus'});
    const s1BUS = new BUS({id: 'bus_1', name: 's1_bus'});
    const s2BUS = new BUS({id: 'bus_2', name: 's2_bus'});

    const arDDR = new AddressRegion({start: '0x00000000', end: '0xFFFFFFFF'}); // 0~4G

    const arT2S2BufA = new AddressRegion({start: '0x20000000', end: '0x200FFFFF'}); // 512M~513M
    const arT2S2BufB = new AddressRegion({start: '0x20100000', end: '0x201FFFFF'}); // 513M~514M
    const arT2S2DDR  = new AddressRegion({start: '0x60000000', end: '0x7FFFFFFF'}); // 1.5G~2G

    const arT2S1BufA = new AddressRegion({start: '0x10000000', end: '0x100FFFFF'}); // 256M~257M
    const arT2S1BufB = new AddressRegion({start: '0x10100000', end: '0x101FFFFF'}); // 257M~258M
    const arT2S1DDR  = new AddressRegion({start: '0x40000000', end: '0x5FFFFFFF'}); // 1G~1.5G

    const arTopDDR   = new AddressRegion({start: '0x80000000', end: '0xFFFFFFFF'}); // 2G~4G
    const arEngView  = new AddressRegion({start: '0x000FFFFF', end: '0x001FFFFF'}); // 0~2M
    const arSubBufA  = new AddressRegion({start: '0x00000000', end: '0x000FFFFF'}); // 0M~1M
    const arSubBufB  = new AddressRegion({start: '0x00100000', end: '0x001FFFFF'}); // 1M~2M
    const arEngAReg  = new AddressRegion({start: '0x00A00000', end: '0x00A03FFF'}); // 10M~10+16K
    const arEngBReg  = new AddressRegion({start: '0x00A04000', end: '0x00A07FFF'}); // 10M+16K~10M+32K
    const arSubDDR   = new AddressRegion({start: '0xC0000000', end: '0xFFFFFFFF'}); // 3G~4G

    const topCPU = new CPU({id: 'cpu_0', name: 'top_cpu', busAddress: new BusAddressMap({bus: topBUS, address: [arDDR]})});
    const topDDR = new Memory({id: 'mem_0', name: 'top_ddr', busAddress: new BusAddressMap({bus: topBUS, address: [arTopDDR]})});

    const s1CPU = new CPU({id: 'cpu_1', name: 's1_cpu', busAddress: new BusAddressMap({bus: s1BUS, address: [arDDR]})});
    const s1BufA = new Memory({id: 'mem_1', name: 's1_bufa', busAddress: new BusAddressMap({bus: s1BUS, address: [arSubBufA]})});
    const s1BufB = new Memory({id: 'mem_2', name: 's1_bufb', busAddress: new BusAddressMap({bus: s1BUS, address: [arSubBufB]})});
    const s1DDR = new Memory({id: 'mem_3', name: 's1_ddr', busAddress: new BusAddressMap({bus: s1BUS, address: [arSubDDR]})});
    const eng1A = new Device({id: 'dev_0', name: 's1_eng1a',
      masterView: new BusAddressMap({bus: s1BUS, address: [arEngView, arSubDDR]}),
      slaveLocate: new BusAddressMap({bus: s1BUS, address: [arEngAReg]}),
    });
    const eng1B = new Device({id: 'dev_1', name: 's1_eng2a',
      masterView: new BusAddressMap({bus: s1BUS, address: [arEngView]}),
      slaveLocate: new BusAddressMap({bus: s1BUS, address: [arEngBReg]}),
    });

    const s2CPU = new CPU({id: 'cpu_2', name: 's2_cpu', busAddress: new BusAddressMap({bus: s2BUS, address: [arDDR]})});
    const s2BufA = new Memory({id: 'mem_4', name: 's2_bufa', busAddress: new BusAddressMap({bus: s2BUS, address: [arSubBufA]})});
    const s2BufB = new Memory({id: 'mem_5', name: 's2_bufb', busAddress: new BusAddressMap({bus: s2BUS, address: [arSubBufB]})});
    const s2DDR = new Memory({id: 'mem_6', name: 's2_ddr', busAddress: new BusAddressMap({bus: s2BUS, address: [arSubDDR]})});
    const eng2A = new Device({id: 'dev_2', name: 's2_eng1a',
      masterView: new BusAddressMap({bus: s2BUS, address: [arEngView, arSubDDR]}),
      slaveLocate: new BusAddressMap({bus: s2BUS, address: [arEngAReg]}),
    });
    const eng2B = new Device({id: 'dev_3', name: 's2_eng2a',
      masterView: new BusAddressMap({bus: s2BUS, address: [arEngView]}),
      slaveLocate: new BusAddressMap({bus: s2BUS, address: [arEngBReg]}),
    });

    const topSystem = new SingleCoreSystem({id: 'system_0', name: 'top_system'});
    topSystem.addHardwares([topBUS, topCPU, topDDR]);

    const subSystem1 = new SingleCoreSystem({id: 'system_1', name: 'sub_system_1'});
    subSystem1.addHardwares([s1BUS, s1CPU, eng1A, eng1B, s1BufA, s1BufB, s1DDR]);

    const subSystem2 = new SingleCoreSystem({id: 'system_2', name: 'sub_system_2'});
    subSystem2.addHardwares([s2BUS, s2CPU, eng2A, eng2B, s2BufA, s2BufB, s2DDR]);

    this.greetings.push(JSON.stringify([topSystem, subSystem1, subSystem2]));
  }
}

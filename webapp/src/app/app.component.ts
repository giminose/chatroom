import { Component } from '@angular/core';
import { Client } from '@stomp/stompjs/esm6/client';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { Message } from '@stomp/stompjs/esm6/i-message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';

  greetings: string[] = [];
  disabled = true;
  name: string = '';
  private client = new Client();
  private subscription: StompSubscription = new StompSubscription();
  constructor() {

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
}

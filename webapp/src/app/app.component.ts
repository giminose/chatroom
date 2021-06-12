import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs/esm6/client';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { Message } from '@stomp/stompjs/esm6/i-message';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  users: string[] = [];
  disabled = true;
  user: string = '';
  private client = new Client();
  private welcomSubscription: StompSubscription = new StompSubscription();
  private leaveSubscription: StompSubscription = new StompSubscription();
  private publicSubscription: StompSubscription = new StompSubscription();
  private privateSubscription: StompSubscription = new StompSubscription();

  constructor() {}

  ngOnDestroy(): void {
    this.client.publish({
      destination: '/chat/leave',
      body: this.user,
      headers: { priority: '9' }
    });

    this.user = '';
  }

  ngOnInit(): void {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.users = [];
    }
  }

  welcomHandler(message: Message) {
    console.log(`welcome: ${message}`);
  }

  leaveHandler(message: Message) {
    console.log(`leave: ${message}`);
  }

  publicHandler(message: Message) {
    console.log(`public: ${message}`);
  }

  privateHandler(message: Message) {
    console.log(`private: ${message}`);
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
      this.welcomSubscription = this.client.subscribe('/mp/welcome', (message) => this.welcomHandler(message))
      this.leaveSubscription = this.client.subscribe('/mp/leave', (message) => this.leaveHandler(message))
      this.publicSubscription = this.client.subscribe('/mp/public', (message) => this.publicHandler(message))
      this.privateSubscription = this.client.subscribe('/mp/private', (message) => this.privateHandler(message))
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
      body: this.user,
      headers: { priority: '9' }
    });
  }

  showGreeting(message: Message) {
    this.users.push(message.body);
  }
}

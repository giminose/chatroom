import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs/esm6/client';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { Message } from '@stomp/stompjs/esm6/i-message';
import { MessageService } from 'primeng/api';
import { ChatMessage } from './shared/chat-message';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private serviceHost = environment.serviceHost;
  private wsHost = environment.wsHost;

  users: string[] = [];
  disabled = true;
  joined = false;
  user: string = '';
  messages: ChatMessage[] = [];
  blockUsers: string[] = [];
  private client = new Client();
  private welcomSubscription: StompSubscription = new StompSubscription();
  private leaveSubscription: StompSubscription = new StompSubscription();
  private publicSubscription: StompSubscription = new StompSubscription();
  private privateSubscription: StompSubscription = new StompSubscription();

  constructor(private messageService: MessageService, private http: HttpClient) {}

  ngOnDestroy(): void {
    this.leave();
    if (this.client != null) {
      this.client.deactivate();
    }
    this.disabled = true;
  }

  ngOnInit(): void {
    this.client = new Client({
      brokerURL: `${this.wsHost}/chatroom`,
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
      console.log('ws connected');
      this.setConnected(true);
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

  getUsers() {
    this.disabled = true;
    this.http.get(`${this.serviceHost}/users`).subscribe(
      (res) => {
        this.disabled = false;
        this.users = <string[]>res;
      },
      (err) => {
        this.disabled = false;
        this.messageService.add({severity:'error', summary:'Get Users Error', detail:`${err}`});
      }
    );
  }

  setConnected(connected: boolean) {
    if (connected) {
      this.getUsers();
    }
  }

  welcomHandler(message: Message) {
    console.log(`welcome: ${message.body}`);
    const user = message.body;
    this.getUsers();
    this.messageService.add({severity:'success', summary:'New Member Joined', detail:`${user} joined the chatroom.`});
  }

  leaveHandler(message: Message) {
    console.log(`leave: ${message.body}`);
    const user = message.body;
    this.messageService.add({severity:'warn', summary:'Member Left', detail:`${user} left the chatroom.`});
    this.welcomSubscription.unsubscribe();
    this.leaveSubscription.unsubscribe();
    this.publicSubscription.unsubscribe();
    this.privateSubscription.unsubscribe();
    this.messages = [];
    this.joined = false;
    this.getUsers();
  }

  publicHandler(message: Message) {
    console.log(`public: ${message}`);
    const chatMessage = new ChatMessage(JSON.parse(message.body));
    if (this.blockUsers.find(v => v === chatMessage.userName)) {
      return;
    }
    this.messages.push(chatMessage);
  }

  privateHandler(message: Message) {
    console.log(`private: ${message}`);
    const chatMessage = new ChatMessage(JSON.parse(message.body));
    if (this.blockUsers.find(v => v === chatMessage.userName)) {
      return;
    }
    this.messages.push(chatMessage);
  }

  join() {
    if (this.user === '' || this.user === null) {
      this.messageService.add({severity:'error', summary:'Name empty', detail:`Please tell us who you are!`});
      return;
    }
    if (this.users.find(v => v === this.user)) {
      this.messageService.add({severity:'warn', summary:'User existed', detail:`Please choose other user name!`});
      return;
    }

    this.joined = true;
    this.welcomSubscription = this.client.subscribe('/mp/welcome', (message) => this.welcomHandler(message));
    this.leaveSubscription = this.client.subscribe('/mp/leave', (message) => this.leaveHandler(message));
    this.publicSubscription = this.client.subscribe('/mp/public', (message) => this.publicHandler(message));
    this.privateSubscription = this.client.subscribe('/mp/private', (message) => this.privateHandler(message));

    this.client.publish({
      destination: '/chat/join',
      body: this.user,
      headers: { priority: '9' }
    });
  }

  leave() {
    this.client.publish({
      destination: '/chat/leave',
      body: this.user,
      headers: { priority: '9' }
    });
  }

  sendMessage(message: string) {
    this.client.publish({
      destination: `/tell/${this.user}`,
      body: message,
      headers: { priority: '9' }
    });
  }

  sendWhisper(message: string, toUser: string) {
    this.client.publish({
      destination: `/talk/${toUser}/${this.user}`,
      body: message,
      headers: { priority: '9' }
    });
  }

  blockUser(user: string) {
    this.blockUsers.push(user);
  }

  unblockUser(user: string) {
    this.blockUsers = this.blockUsers.filter(v => v !== user);
  }
}

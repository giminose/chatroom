import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Client } from '@stomp/stompjs/esm6/client';
import { StompSubscription } from '@stomp/stompjs/esm6/stomp-subscription';
import { Message } from '@stomp/stompjs/esm6/i-message';
import { MessageService } from 'primeng/api';
import { ChatMessage } from './shared/chat-message';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/user';
import { HwService } from './shared/hw/hw.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  private serviceHost = environment.serviceHost;
  private wsHost = environment.wsHost;

  qq: string = '';

  users: User[] = [];
  disabled = false;
  joined = false;
  user: User = new User('');
  messages: ChatMessage[] = [];
  message: string = '';
  private client = new Client();
  private welcomSubscription: StompSubscription = new StompSubscription();
  private leaveSubscription: StompSubscription = new StompSubscription();
  private publicSubscription: StompSubscription = new StompSubscription();
  private privateSubscription: StompSubscription = new StompSubscription();

  scrollHeight = '144px';

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		const height = event.target.innerHeight - 144;
		this.scrollHeight = `${height}px`;
	}

  @HostListener("window:beforeunload", ["$event"])
  unloadHandler(event: Event) {
    if (this.joined) {
      this.leave();
    }
  }

  constructor(private messageService: MessageService, private http: HttpClient, private hwService: HwService) {
    // this.qq = hwService.generateComponent();
  }

  ngAfterViewInit(): void {
		setTimeout(() => {
			const height = window.innerHeight - 144;
			this.scrollHeight = `${height}px`;
		}, 50);
	}

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

    // this.client.activate();
  }

  getUsers() {
    this.disabled = true;
    this.http.get<Array<string>>(`${this.serviceHost}/users`).subscribe(
      (res: Array<string>) => {
        this.disabled = false;
        this.users = res.map<User>(v => new User(v));
        this.users = this.users.filter(v => v.name !== this.user.name);
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
    this.joined = true;
    if (this.user.name !== user) {
      this.messageService.add({severity:'success', summary:'Member Joined', detail:`${user} joined the chatroom.`});
    } else {
      this.messageService.add({severity:'success', summary:'Wlecom', detail:`Hi, ${user}!`});
    }
  }

  leaveHandler(message: Message) {
    console.log(`leave: ${message.body}`);
    const user = message.body;
    if (this.user.name !== user) {
      this.messageService.add({severity:'warn', summary:'Member Left', detail:`${user} leaved the chatroom.`});
    }
    if (this.user.name === user) {
      this.welcomSubscription.unsubscribe();
      this.leaveSubscription.unsubscribe();
      this.publicSubscription.unsubscribe();
      this.privateSubscription.unsubscribe();
      this.messages = [];
      this.joined = false;
    }
    this.getUsers();
  }

  publicHandler(message: Message) {
    console.log(`public: ${message}`);
    const chatMessage = new ChatMessage(JSON.parse(message.body));
    if (this.users.find(v => v.banned && v.name === chatMessage.userName)) {
      return;
    }
    this.messages.push(chatMessage);
    this.message = '';
  }

  privateHandler(message: Message) {
    console.log(`private: ${message}`);
    const chatMessage = new ChatMessage(JSON.parse(message.body));
    if (this.users.find(v => v.banned && v.name === chatMessage.userName)) {
      return;
    }
    this.messages.push(chatMessage);
  }

  join() {
    if (this.user == null || this.user.name === '') {
      this.messageService.add({severity:'error', summary:'Name empty', detail:`Please tell us who you are!`});
      return;
    }

    this.http.get<Array<string>>(`${this.serviceHost}/users`).subscribe(
      (res: Array<string>) => {
        this.disabled = false;
        if (res.find(v => v === this.user.name)) {
          this.messageService.add({severity:'warn', summary:'User existed', detail:`Please choose other user name!`});
          return;
        }

        this.welcomSubscription = this.client.subscribe('/mp/welcome', (message) => this.welcomHandler(message));
        this.leaveSubscription = this.client.subscribe('/mp/leave', (message) => this.leaveHandler(message));
        this.publicSubscription = this.client.subscribe('/mp/public', (message) => this.publicHandler(message));
        this.privateSubscription = this.client.subscribe(`/mp/private/${this.user.name}`, (message) => this.privateHandler(message));

        this.client.publish({
          destination: '/chat/join',
          body: this.user.name,
          headers: { priority: '9' }
        });
      },
      (err) => {
        this.disabled = false;
        this.messageService.add({severity:'error', summary:'Get Users Error', detail:`${err}`});
      }
    );
  }

  leave() {
    this.client.publish({
      destination: '/chat/leave',
      body: this.user.name,
      headers: { priority: '9' }
    });
  }

  sendMessage() {
    if (this.message === '') {
      this.messageService.add({severity:'info', summary:'Too Quite', detail: 'Please say something'})
      return;
    }
    this.client.publish({
      destination: `/chat/tell/${this.user.name}`,
      body: this.message,
      headers: { priority: '9' }
    });
  }

  sendWhisper(toUser: User) {
    this.client.publish({
      destination: `/chat/talk/${toUser.name}/${this.user.name}`,
      body: this.message,
      headers: { priority: '9' }
    });
  }

  blockUser(user: User) {
    user.banned = true;
  }

  unblockUser(user: User) {
    user.banned = false;
  }
}

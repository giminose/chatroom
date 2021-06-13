export class ChatMessage {

  message: string;
  userName: string;
  isWhisper: boolean;
  createTime: Date;

  constructor(options: {
    message: string;
    userName: string;
    isWhisper: boolean;
    createTime: number;
  }) {
    this.message = options.message;
    this.userName= options.userName;
    this.isWhisper = options.isWhisper;
    this.createTime = new Date(options.createTime);
  }
}

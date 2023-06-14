import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

import { safe } from 'src/environments/safe';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  public sender: any;
  public receiver: any;

  public senderMessages: any = [];
  public receiverMessages: any = [];
  public messages: any = null;

  public currentMessage: any;

  public socket: any;

  public CHAT_ROOM = "abcxyzpqr";

  private chatId: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private messageService: MessageService
  ) {
    let sender:any = this.route.snapshot.paramMap.get('sender');
    this.sender = JSON.parse(sender);
    let receiver:any = this.route.snapshot.paramMap.get('receiver');
    this.receiver = JSON.parse(receiver);
    let messages: any = this.route.snapshot.paramMap.get('messages');
    this.messages = JSON.parse(messages);
    console.log("Sender: ", sender);
    console.log("Receiver: ", receiver);

  }

  ngOnInit() {
    // this.http.getChatsByChatId(1).subscribe(
    //   (chats) => {
    //     console.log("CHATS FROM SERVER: ", chats);
    //     this.messages = chats;
    //   }
    // );

    this.chatId = this.route.snapshot.paramMap.get('chatId');
    console.log("CHAT ID: ", this.chatId);
    
    this.messageService.setupSocketConnection();
    this.messageService.joinRoom("" + this.chatId);

    this.messageService.subscribeToMessages((err: any, data: any) => {
      // console.log("NEW MESSAGE ", data);
      let newMessage = {
        message: data.message,
        sent_by: this.receiver.user_id
      };
      if (this.messages == null)
        this.messages = [];
      this.messages = [...this.messages, newMessage];
      console.log("NEW Messages: ", this.messages);
    });
  }

  sendCurrentMessage() {
    let messageObject = {
      message: this.currentMessage,
      sent_by: this.sender.user_id
    };

    if (this.messages == null)
      this.messages = [];
    this.messages.push(messageObject);
    // this.messages = [...this.messages, messageObject];

    let roomObject = {
      message: this.currentMessage,
      roomName: "" + this.chatId
    };
    // console.log("ROOM Obkect: ", roomObject);
    
    this.messageService.sendMessage(roomObject, (callBack: any) => {
      console.log("ACKNOWLEDGEMENT ", callBack);
    });

    this.http.addMessageToChat(this.currentMessage, this.chatId, this.sender.user_id).subscribe(
      () => {
        console.log("Message POSTED!!!");;
      }
    );

    this.currentMessage = "";
  }
}

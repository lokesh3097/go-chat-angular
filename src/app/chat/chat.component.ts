import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

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
  public messages: any = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    let sender:any = this.route.snapshot.paramMap.get('sender');
    this.sender = JSON.parse(sender);
    let receiver:any = this.route.snapshot.paramMap.get('receiver');
    this.receiver = JSON.parse(receiver);

    console.log("Sender: ", sender);
    console.log("Receiver: ", receiver);

  }

  ngOnInit() {
    this.http.getChatsByChatId(1).subscribe(
      (chats) => {
        console.log("CHATS FROM SERVER: ", chats);
        this.messages = chats;
      }
    );
  }
}

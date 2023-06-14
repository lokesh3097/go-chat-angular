import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public contactEmail: any;
  public sender: any;
  public receiver: any;

  public senderEmail: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {
    this.senderEmail = this.route.snapshot.paramMap.get('senderEmail');

    // this.sender = JSON.parse(sender);
    // console.log("Sender Email: ", this.sender.user_email);
    
  }

  async checkContactUser() {
    // console.log("Contact Email: ", this.contactEmail);
    // await this.http.checkUser(this.contactEmail).subscribe(
    //   (user) => {
    //     console.log("User from Server: ", user);

    //     this.receiver = user;

    //     // this.router.navigate(['chat', {
    //     //   sender: JSON.stringify(this.sender),
    //     //   receiver: JSON.stringify(user)
    //     // }]);
    //   }
    // );

    this.http.getChatWithEmails(this.senderEmail, this.contactEmail).subscribe(
      (data: any) => {
        console.log("DATA FROM SERVER:  ", data);
        this.router.navigate(['chat', {
          sender: JSON.stringify(data.users[0]),
          receiver: JSON.stringify(data.users[1]),
          messages: JSON.stringify(data.messages),
          chatId: data.chatId
        }]);
      }
    );
  }
}

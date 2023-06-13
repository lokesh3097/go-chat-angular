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

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private router: Router
  ) {
    let sender:any = this.route.snapshot.paramMap.get('sender');
    this.sender = JSON.parse(sender);
    console.log("Sender Email: ", this.sender.user_email);
    
  }

  checkContactUser() {
    // console.log("Contact Email: ", this.contactEmail);
    this.http.checkUser(this.contactEmail).subscribe(
      (user) => {
        console.log("User from Server: ", user);

        this.router.navigate(['chat', {
          sender: JSON.stringify(this.sender),
          receiver: JSON.stringify(user)
        }]);
      }
    );
  }
}

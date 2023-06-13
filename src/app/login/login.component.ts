import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email = null;

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  checkUser() {
    // console.log(this.email);

    this.http.checkUser(this.email).subscribe(
      (user) => {
        console.log("User from Server: ", user);

        this.router.navigate(['contact', {
          sender: JSON.stringify(user)
        }]);
      }
    );
  }
}

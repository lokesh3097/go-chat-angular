import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { safe } from '../environments/safe';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public serverURL = safe.devServerURL;

  constructor(
    private http: HttpClient
  ) { }

  checkUser(userEmail: any) {
    return this.http.get(this.serverURL + "/user/email/" + userEmail);
  }

  getChatsByChatId(chatId: any) {
    return this.http.get(this.serverURL + "/chat/" + chatId);
  }
}

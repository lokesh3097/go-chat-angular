import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer} from 'rxjs';
import { io } from 'socket.io-client';
import { safe } from 'src/environments/safe';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public socket: any;

  constructor() { }

  // socket = io(safe.devServerURL);

//   socket = io('http://localhost:3000', {
//     reconnectionDelay: 1000,
//     reconnection: true,
//     reconnectionAttempts: 10,
//     transports: ['websocket'],
//     agent: false,
//     upgrade: false,
//     rejectUnauthorized: false
// });

  setupSocketConnection() {
    this.socket = io(safe.devServerURL);
  }

  public sendMessage(roomObject: any, cb: any) {
    if (this.socket) this.socket.emit('message', roomObject, cb);
  }

  public subscribeToMessages(cb: any) {
    if (!this.socket) return(true);
    this.socket.on('message', (msg: any) => {
      console.log('Room event received!');
      return cb(null, msg);
    });

    return;
  }

  public joinRoom(roomName: any) {
    this.socket.emit('join', roomName);
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
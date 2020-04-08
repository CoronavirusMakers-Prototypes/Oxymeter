import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Subscription, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';
import { User } from '@app/class/User';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private SOCKET_PORT = environment.socket_port;
  private SOCKET_URL = environment.socket_url;
  private serviceWorkerUbication = '/assets/ext/serviceWorker.js';
  private swRegistration = null;
  private publicVapidKey ='BJ4yXKga1U4YkEdqEK-b_sakIPmc0zmlxFDtZvrdP2hpBnaarE4lBsITi4qX4ji72Wdyl_krizpMPila42j2PQQ';

  private socket: any;

  private alarmAreaEventSource = new BehaviorSubject<any>(null);
  alarmAreaEvent$ = this.alarmAreaEventSource.asObservable();
  private alarmRoomEventSource = new BehaviorSubject<any>(null);
  alarmRoomEvent$ = this.alarmRoomEventSource.asObservable();
  private bedDataEventSource = new BehaviorSubject<any>(null);
  bedDataEvent$ = this.bedDataEventSource.asObservable();

  constructor(public authService: AuthenticationService, public dialog: MatDialog) {
    this.socket = io.connect(`${this.SOCKET_URL}:${this.SOCKET_PORT}`);
    this.setSocketsActions();
    // this.setNotificationsAndServiceWorker();
  }

  public subscribeTo = room => {
    this.socket.emit('subscribeTo', room);
  }
  public unsubscribe = room => {
    this.socket.emit('disconnect', room);
  }

  private setSocketsActions = () => {
      this.socket.on('alarm-in-area', function(data){
        this.alarmAreaEventSource.next(data);
      });
      this.socket.on('alarm-in-room', function(data){
        this.alarmRoomEventSource.next(data);
      });
      this.socket.on('updated_data_for_bed', function(data){
        this.bedDataEventSource.next(data);
      });
      this.mockSocket();
  }

  public mockSocket = () => {
    let delay = Math.floor(Math.random()*1000+2000)
    setTimeout(()=>{
      let data = {
          "id": 1,
          "date": 1586362504462,
          "id_patient": 1,
          "id_sensor": 1,
          "ack_user": 1,
          "ack_date": 1586362504462,
          "status": 1,
          "id_bed": 1,
          "id_area": 1,
          "id_room": 1,
          "area_desc": "Area desc",
          "room_desc": "Room desc"
      }
      this.alarmRoomEventSource.next(data);
      this.mockSocket();
    },delay)
  }

  /* NOTIFICATION SERVICE WORKER NOT USED
  setNotificationsAndServiceWorker = () => {
    if (!('Notification' in window)) {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
          message:
            'alerts.notifications-not-supported',
          type: 'simple'
        }
      });
    } else if (Notification.permission === 'granted') {
      this.setServiceWorker();
    } else if (Notification.permission !== 'denied') {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '90%',
        data: {
          message:
            'alerts.ask-for-notifications-permission',
          type: 'confirmation'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          Notification.requestPermission( (permission) => {
            if (permission === 'granted') {
              this.setServiceWorker();
              // var notification = new Notification("Hi there!");
            }
          });
        }
      });
    }
  };

  setServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(this.serviceWorkerUbication)
        .then(reg => {
          this.swRegistration = reg;
          this.generateSWSubscription();
        });
    } else {
      this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
          message:
            'alerts.service-wrokers-not-supported',
          type: 'simple'
        }
      });
    }
  }

  generateSWSubscription = () => {
    this.swRegistration.pushManager.getSubscription().then(subs => {
      this.swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.publicVapidKey)
        })
        .then(aux => {
          this.saveSubscription(aux);
        });
    });
  };

  urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  saveSubscription = subscription => {
    //const userData: User = this.authService.getData();
    console.log('Setting swId: ' + subscription.endpoint);
    // userData.addSwId(subscription.endpoint);
    //this.authService.setUserData(userData);
    //this.emitSetUser();
    const res = fetch(`${this.SOCKET_URL}:${this.SOCKET_PORT}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
  };*/
}

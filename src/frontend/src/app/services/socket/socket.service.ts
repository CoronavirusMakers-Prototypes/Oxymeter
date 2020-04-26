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
  private alarms: any[] = [];
  private audio: any;
  private soundAlarmActive = true;

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
    // this.mockSocketSensor();
    this.audio = new Audio();
    this.audio.src = '../../../assets/sound/alarm.mp3';
    this.audio.load();
  }

  public subscribeTo = room => {
    if (!this.socket){ return; }
    this.socket.emit('subscribeTo', room);
  }
  public unsubscribe = room => {
    if(!this.socket){ return; }
    this.socket.emit('disconnect', room);
  }

  private setSocketsActions = () => {
      this.socket.on('alarm-in-area', function(data){
        this.alarms.push(data);
        this.playAlarm();
        this.alarmAreaEventSource.next(data);
      });
      this.socket.on('alarm-in-room', function(data){
        this.alarms.push(data);
        this.playAlarm();
        this.alarmRoomEventSource.next(data);
      });
      this.socket.on('updated_data_for_bed', function(data){
        this.bedDataEventSource.next(data);
      });
  }

  public playAlarm = () => {
    if(this.soundAlarmActive){
      this.audio.play();
    }
  }

  public getSoundAlarm = () => this.soundAlarmActive;
  public setSoundAlarm = active => this.soundAlarmActive = active;

  public getAlarms = () => this.alarms;
  public addAlarms = (alarms) => this.alarms = [...this.alarms, ...alarms];

  public hasActiveAlarmIn = ( id_area = null, id_room = null, id_bed = null ) => {
    return this.alarms.find( a => {
      let result = false;
      if(id_area){ result = parseInt(a.id_area) === parseInt(id_area) && !a.ack_user; }
      if(id_room){ result =  parseInt(a.id_room) === parseInt(id_room) && !a.ack_user; }
      if(id_bed){ result =  parseInt(a.id_bed) === parseInt(id_bed) && !a.ack_user; }
      return result;
    })
  }

  public worstStatusAlarms = () => {
    let worst = 0;
    this.alarms.forEach( a => {
      if(!a.ack_user && a.status > worst ){ worst = a.status; }
    })
    return worst;
  }

  public setAckUser = (aId, uId = null) => {
      const alarm = this.alarms.find(a => parseInt(a.id) === parseInt(aId));
      alarm.ack_user = uId;
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

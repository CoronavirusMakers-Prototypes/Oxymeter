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

  
  // MOCKS
  private bedSubscribed = null;
  private firstDelay = 5000;
  private prob = 800;
  public sensorDataByIdBed = {};
  public bedSubcriptions = [
    {
      id_patient: 1,
      id_sensor: 1,
      id_bed: 6,
      id_area: 9,
      id_room: 8,
      area_desc: 'UE7.01',
      room_desc: 'Room 1',
      bed_desc: 'Bed 1'
    },
    {
      id_patient: 2,
      id_sensor: 2,
      id_bed: 7,
      id_area: 9,
      id_room: 8,
      area_desc: 'UE7.01',
      room_desc: 'Room 1',
      bed_desc: 'Bed 2'
    },
    {
      id_patient: 3,
      id_sensor: 3,
      id_bed: 9,
      id_area: 9,
      id_room: 9,
      area_desc: 'UE7.01',
      room_desc: 'Room 2',
      bed_desc: 'Bed 1'
    },
    {
      id_patient: 4,
      id_sensor: 4,
      id_bed: 10,
      id_area: 9,
      id_room: 10,
      area_desc: 'UE7.01',
      room_desc: 'Room 3',
      bed_desc: 'Bed 1'
    },
    {
      id_patient: 5,
      id_sensor: 5,
      id_bed: 8,
      id_area: 10,
      id_room: 11,
      area_desc: 'UE7.02',
      room_desc: 'Room 1',
      bed_desc: 'Bed 1'
    },
    {
      id_patient: 6,
      id_sensor: 6,
      id_bed: 11,
      id_area: 10,
      id_room: 12,
      area_desc: 'UE7.02',
      room_desc: 'Room 2',
      bed_desc: 'Bed 1'
    }
  ];
  // FIN MOCKS

  constructor(public authService: AuthenticationService, public dialog: MatDialog) {
    // this.socket = io.connect(`${this.SOCKET_URL}:${this.SOCKET_PORT}`);
    // this.setSocketsActions()
    // this.setNotificationsAndServiceWorker();
    this.mockSocketSensor();
    this.audio = new Audio();
    this.audio.src = '../../../assets/sound/alarm.mp3';
    this.audio.load();
  }

  public unSubscribeToBed = () => {
    this.bedSubscribed = null;
  }
  public subscribeToBed = bed => {
    this.bedSubscribed = bed
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
        this.alarmAreaEventSource.next(data);
      });
      this.socket.on('alarm-in-room', function(data){
        this.alarms.push(data);
        this.alarmRoomEventSource.next(data);
      });
      this.socket.on('updated_data_for_bed', function(data){
        this.bedDataEventSource.next(data);
      });
  }

  public getLastDataForBed = idBed => {
    return this.sensorDataByIdBed[idBed].slice((this.sensorDataByIdBed[idBed].length - 100), this.sensorDataByIdBed[idBed].length);
  }

  public generateRandomSensorData = ( time = null ) => {
    const prob = Math.floor(Math.random()*1000+1);
    const max = {
      spo2: 99,
      ppm: 90,
      batt: 100,
      temp: 369
    }
    const min = {
      spo2: 90,
      ppm: 65,
      batt: 26,
      temp: 354
    }
    const result = {
      alarm: false,
      type: Math.floor((Math.random()*4)+1),
      data: {
        id: time? time: new Date().getTime(),
        time: time? time: new Date().getTime(),
        spo2: Math.floor(Math.random() * ((max.spo2 + 1) - min.spo2)) + min.spo2,
        ppm: Math.floor(Math.random() * ((max.ppm + 1) - min.ppm)) + min.ppm,
        batt: Math.floor(Math.random() * ((max.batt + 1) - min.batt)) + min.batt,
        temp: Math.floor(Math.random() * ((max.temp + 1) - min.temp)) + min.temp,
        sequence: 1222,
        sensorId: 45645644
      }
    }
    if(!time && prob > this.prob){
      this.prob = this.prob + 70 < 900 ? this.prob+70 : 990;
      result.alarm = true;
      if(result.type === 1){ // ppm
        result.data.ppm = Math.floor(Math.random() * ((max.ppm + 20) - max.ppm+1)) + max.ppm+1
      }else if(result.type === 2){ // spo2
        result.data.spo2 = Math.floor(Math.random() * ((max.spo2 + 10) - max.spo2+1)) + max.spo2+1
      }else if(result.type === 3){ // temp
        result.data.ppm = Math.floor(Math.random() * ((max.ppm + 30) - max.ppm+1)) + max.ppm+1
      }else{ // batt
        result.data.batt = Math.floor(Math.random() * ((25) - 3)) + 3;
      }
    }
    result.data.temp = result.data.temp / 10;
    return result;
  }

  public mockSocketSensor = () => {
    setTimeout(() => {
      this.bedSubcriptions.forEach(sub => {
        if( !this.sensorDataByIdBed[sub.id_bed] ) {
          this.sensorDataByIdBed[sub.id_bed] = [];
        }
        let time = new Date().getTime() - (10000 * 102);
        while(this.sensorDataByIdBed[sub.id_bed].length < 102){
          this.sensorDataByIdBed[sub.id_bed].push(this.generateRandomSensorData(time).data);
          time += 10000;
        }
        const randomData = this.generateRandomSensorData();
        this.sensorDataByIdBed[sub.id_bed].push(randomData.data);
        if(randomData.alarm){
          const alarm = {
            id: new Date().getTime(),
            date: new Date().getTime(),
            id_patient: sub.id_patient,
            id_sensor: sub.id_sensor,
            ack_user: null,
            ack_date: 1586362504462,
            status: randomData.type,
            id_bed: sub.id_bed,
            id_area: sub.id_area,
            id_room: sub.id_room,
            area_desc: sub.area_desc,
            room_desc: sub.room_desc,
            bed_desc: sub.bed_desc
          }
          this.alarms.push(alarm);
          this.alarmRoomEventSource.next(alarm);
          this.playAlarm();
        }
        if(sub.id_bed === parseInt(this.bedSubscribed)){
          this.bedDataEventSource.next(randomData.data);
        }
      })
      this.mockSocketSensor();
    },10000)
  }

  public mockSocket = () => {
    let delay = Math.floor(Math.random()*120000+60000)
    if(this.firstDelay && this.firstDelay !== 20000 ){
      delay = this.firstDelay;
      this.firstDelay = 20000;
    }else if(this.firstDelay){
      delay = this.firstDelay;
      this.firstDelay = 0;
    }
    setTimeout(() => {
      const sub  = this.bedSubcriptions[Math.floor((Math.random()*this.bedSubcriptions.length))];
      const data = {
          id: new Date().getTime(),
          date: new Date().getTime(),
          id_patient: sub.id_patient,
          id_sensor: sub.id_sensor,
          ack_user: null,
          ack_date: 1586362504462,
          status: Math.floor((Math.random()*4)+1),
          id_bed: sub.id_bed,
          id_area: sub.id_area,
          id_room: sub.id_room,
          area_desc: sub.area_desc,
          room_desc: sub.room_desc,
          bed_desc: sub.bed_desc
      }
      this.alarms.push(data);
      this.alarmRoomEventSource.next(data);
      this.playAlarm();
      this.mockSocket();
    }, delay);
  }

  public playAlarm = () => {
    if(this.soundAlarmActive){
      this.audio.play();
    }
  }

  public getSoundAlarm = () => this.soundAlarmActive;
  public setSoundAlarm = active => this.soundAlarmActive = active;

  public getAlarms = () => this.alarms;

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

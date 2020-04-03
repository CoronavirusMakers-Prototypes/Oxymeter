import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';
import { User } from '@app/class/User';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private socketsArray: Array<string>;
  private SOCKET_PORT = 8000;
  private PORT = null;
  private URL: string;
  private serviceWorkerUbication = '/assets/ext/serviceWorker.js';
  private swRegistration = null;
  private publicVapidKey =
    'BJ4yXKga1U4YkEdqEK-b_sakIPmc0zmlxFDtZvrdP2hpBnaarE4lBsITi4qX4ji72Wdyl_krizpMPila42j2PQQ';

  public enoughDataSubscription: Subscription;
  public resetDataSubscription: Subscription;

  constructor(public authService: AuthenticationService, public dialog: MatDialog) {
    // TODO: variables de entorno
    const aOrigin = window.location.origin.split(':');
    this.URL = aOrigin[0] + ':' + aOrigin[1];
    if (aOrigin[3]) {
      this.PORT = aOrigin[3];
    }
    // this.socket = io.connect(`${this.URL}:${this.SOCKET_PORT}`);
    // this.setSocketsActions();
    // this.setNotificationsAndServiceWorker();
  }

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
          if (reg.installing) {
            console.log('Service worker installing');
          } else if (reg.waiting) {
            console.log('Service worker installed');
          } else if (reg.active) {
            console.log('Service worker active');
          }
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
    const userData: User = this.authService.getData();
    console.log('Setting swId: ' + subscription.endpoint);
    // userData.addSwId(subscription.endpoint);
    this.authService.setUserData(userData);
    this.emitSetUser();
    const res = fetch(`${this.URL}:${this.SOCKET_PORT}/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscription)
    });
  };

  /* Sockets actions */
  setSocketsActions = () => {
    this.socket.on('users-connected', num => {
      //
    });

    this.socket.on('refresh-user-data', data => {
      this.authService.setUserData( new User(data));
    });
  };

  /* Emitters */
  emitConnectUser = () => {
    const data: User = this.authService.getData();
    this.socket.emit('connect-user', data.getObject());
  };
  emitSetUser = () => {
    this.socket.emit('set-user-data', this.authService.getData().getObject());
  };
  emitDeleteUser = () => {
    this.socket.emit('delete-user', this.authService.getData().getObject());
  };
}

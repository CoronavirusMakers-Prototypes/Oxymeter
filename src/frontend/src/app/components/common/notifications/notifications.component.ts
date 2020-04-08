import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlarmsSubscriptionService } from '@services/byFuncionality/alarms-subscription.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private areaAlarmSubscription: Subscription;
  private roomAlarmSubscription: Subscription;

  public alarms: any[] = [];

  // TODO: si supera una longitud quitar alguna

  constructor( private alarmService: AlarmsSubscriptionService) {
    this.areaAlarmSubscription = alarmService.socketService.alarmAreaEvent$.subscribe( value => {
      if(value) this.alarms.push(value);
      if(this.alarms.length === 1) this.removeAlarm();
    })
    this.roomAlarmSubscription = alarmService.socketService.alarmRoomEvent$.subscribe( value => {
      if(value) this.alarms.push(value);
      if(this.alarms.length === 1) this.removeAlarm();
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void{
    this.areaAlarmSubscription.unsubscribe();
    this.roomAlarmSubscription.unsubscribe();
  }

  removeAlarm = () => {
    setTimeout(() => {
      this.alarms.splice(0,1);
      if(this.alarms.length > 0) this.removeAlarm();
    },3000);
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlarmsSubscriptionService } from '@services/byFuncionality/alarms-subscription.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private areaAlarmSubscription: Subscription;
  private roomAlarmSubscription: Subscription;

  private delayAlarms = 5000;
  private maxAlarmsShown = 3;

  public alarms: any[] = [];

  // TODO: si supera una longitud quitar alguna

  constructor( private alarmService: AlarmsSubscriptionService, private router: Router) {
    this.areaAlarmSubscription = alarmService.socketService.alarmAreaEvent$.subscribe( value => {
      if(value){ 
        this.alarms.push(value); 
        if(this.alarms.length > this.maxAlarmsShown){
          this.forceRemove();
        }
      }
      if(this.alarms.length === 1){ this.removeAlarm(); }
    })
    this.roomAlarmSubscription = alarmService.socketService.alarmRoomEvent$.subscribe( value => {
      if(value){ 
        this.alarms.push(value); 
        if(this.alarms.length > this.maxAlarmsShown){
          this.forceRemove();
        }
      }
      if(this.alarms.length === 1){ this.removeAlarm(); }
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
      if(this.alarms.length > 0){ this.alarms.splice(0,1); }
      if(this.alarms.length > 0){ this.removeAlarm(); }
    },this.delayAlarms);
  }

  forceRemove = () => {
    this.alarms.splice(0,1);
  }

  closeAndGo = (i, bedId) => {
    this.alarms.splice( i , 1);
    this.router.navigate([`/bed/${bedId}`]);
  }

  getAlarmIcon = (status) => {
    let icon = '';
    switch(parseInt(status)){
      case 1:
        icon = 'fa-heartbeat';
        break;
      case 2:
        icon = 'fa-cloud';
        break;
      case 3:
        icon = 'fa-thermometer-full';
        break;
      case 4:
        icon = 'fa-battery-quarter';
        break;
    }
    return icon;
  }

  getGeneralAlarmClass = () => {
    const status = this.alarmService.socketService.worstStatusAlarms();
    let classes = '';
    if(status){
      classes = 'active';
    }
    /*switch (status){
      case 1:
        classes = 'active';
        break;
      case 2:
        classes = 'active critical';
        break;
    }*/
    return classes;
  }

}

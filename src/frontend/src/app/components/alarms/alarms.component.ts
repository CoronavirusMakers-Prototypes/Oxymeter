import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';
import { SocketService } from '@app/services/socket/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alarms',
  templateUrl: './alarms.component.html',
  styleUrls: ['./alarms.component.scss']
})
export class AlarmsComponent implements OnInit, OnDestroy {

  private areaAlarmSubscription: Subscription;
  private roomAlarmSubscription: Subscription;

  public alarmSoundActive: boolean;
  public showViewedAlarms = false;
  public alarms: any[] = [];
  public alarmsToShow: any[] = [];
  public options = {
    filterView: null,
    filterValue: null,
    groupArea: null,
    groupRoom: null
  };
  public areas: any[] = [];
  public idAreas: any[] = [];
  public roomsToFilter: any[] = [];
  public rooms: any = {};
  public idRooms: any = {};

  constructor(public globalService: GlobalService, private socketService: SocketService) {
    this.alarmSoundActive = socketService.getSoundAlarm();
    this.areaAlarmSubscription = socketService.alarmAreaEvent$.subscribe( value => {
      if (value) {
        this.checkAreaRoomBedAlarm(value);
      }
    });
    this.roomAlarmSubscription = socketService.alarmRoomEvent$.subscribe( value => {
      if (value){
        this.checkAreaRoomBedAlarm(value);
      }
    });
  }

  ngOnInit(): void {
    this.loadAlarms();
    this.options.filterValue = 'status';
    this.options.filterView = 'all';
  }

  loadAlarms(){
    let alarms = this.socketService.getAlarms();
    alarms.forEach( a => this.checkAreaRoomBedAlarm(a));
  }

  ngOnDestroy(): void{
    this.areaAlarmSubscription.unsubscribe();
    this.roomAlarmSubscription.unsubscribe();
  }

  addAlarm( alarm ) {
    this.alarms.push(alarm);
    if(this.idAreas.indexOf(alarm.id_area) === -1){
      this.idAreas.push(alarm.id_area);
      this.areas.push({id: alarm.id_area, desc: alarm.area_desc});
      this.areas.sort((a, b) => a.id - b.id);
      this.idRooms[alarm.id_area] = [];
      this.idRooms[alarm.id_area].push(alarm.id_room);
      this.rooms[alarm.id_area] = [];
      this.rooms[alarm.id_area].push({id: alarm.id_room, desc: alarm.room_desc});
      this.rooms[alarm.id_area].sort((a, b) => a.id - b.id);
    }else if (this.idRooms[alarm.id_area].indexOf(alarm.id_room) === -1){
      this.idRooms[alarm.id_area].push(alarm.id_room);
      this.rooms[alarm.id_area].push({id: alarm.id_room, desc: alarm.room_desc});
      this.rooms[alarm.id_area].sort((a, b) => a.id - b.id);
    }
    this.applyFilters();
  }

  setRoomsToFilter = () => this.roomsToFilter = this.rooms[this.options.groupArea];

  checkAreaRoomBedAlarm(alarm) {
    let alarmFoundIndex = this.alarms.findIndex(a => {
      return parseInt(a.id_area) === parseInt(alarm.id_area) &&
            parseInt(a.id_room) === parseInt(alarm.id_room) &&
            parseInt(a.id_bed) === parseInt(alarm.id_bed);
    });
    if(alarmFoundIndex >= 0){
      this.alarms.splice(alarmFoundIndex, 1, alarm);
    }else{
      this.addAlarm(alarm);
    }
  }

  applyFilters = () => {
    let alarmsToShow = JSON.parse(JSON.stringify(this.alarms));
    switch(this.options.filterView){
      case 'news':
        alarmsToShow = alarmsToShow.filter(a => !a.ack_user);
        break;
      case 'old':
        alarmsToShow = alarmsToShow.filter(a => a.ack_user);
        break;
    }
    switch(this.options.filterValue){
      case 'news':
        alarmsToShow.sort((a,b)=> b.date - a.date );
        break;
      case 'old':
        alarmsToShow.sort((a,b)=> a.date - b.date );
        break;
      case 'ubication':
        alarmsToShow.sort((a,b)=> {
          let x = a.id_area - b.id_area;
          if(!x){
            x = a.id_room - b.id_room;
          }
          return x;
        });
        break;
      default: // status
        alarmsToShow.sort((a,b)=> b.status - a.status );
    }
    if(this.options.groupArea){
      alarmsToShow = alarmsToShow.filter(a => parseInt(a.id_area) === parseInt(this.options.groupArea));
    }
    if(this.options.groupRoom){
      alarmsToShow = alarmsToShow.filter(a => parseInt(a.id_room) === parseInt(this.options.groupRoom));
    }
    this.alarmsToShow = alarmsToShow;
  }

  changeSoundAlarms = () => {
    this.alarmSoundActive = !this.alarmSoundActive;
    this.socketService.setSoundAlarm(this.alarmSoundActive);
  }

  setAckUser = (a) => {
    this.socketService.setAckUser(a.id, this.globalService.authService.getId());
    a.ack_user = this.globalService.authService.getId();
    this.applyFilters();
  }

  unSetAckUser = (a) => {
    this.socketService.setAckUser(a.id);
    a.ack_user = null;
    this.applyFilters();
  }


}

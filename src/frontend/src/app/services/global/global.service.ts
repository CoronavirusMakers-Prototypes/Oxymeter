import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { HospitalService } from '../byFuncionality/hospital.service';
import { UtilsService } from '../byFuncionality/utils.service';
import { AlarmsSubscriptionService } from '../byFuncionality/alarms-subscription.service';
import { AlarmsService } from '../byFuncionality/alarms.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private KEY = 'oxymetercc_globaldata';
  public localData: any;
  private enabledRoutesWithoutLogin = ['/login', '/registration', '/about'];

  private loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable();

  public buildingSource = new BehaviorSubject<any>(null);
  building$ = this.buildingSource.asObservable();
  public floorSource = new BehaviorSubject<any>(null);
  floor$ = this.floorSource.asObservable();
  public areaSource = new BehaviorSubject<any>(null);
  area$ = this.areaSource.asObservable();
  public roomSource = new BehaviorSubject<any>(null);
  room$ = this.roomSource.asObservable();

  constructor(public authService: AuthenticationService, public utils: UtilsService,
              public hospitalService: HospitalService, public alarmsSubscriptionService: AlarmsSubscriptionService,
              public alarmsService: AlarmsService,  public router: Router) {
    try{
      alarmsSubscriptionService.setUserId(authService.getId());
      alarmsService.setUserId(authService.getId());
      const localData: any = localStorage.getItem(this.KEY);
      if (localData && localData !== '[object Object]') {
        this.localData = JSON.parse(localData);
        if (this.localData.building){
          this.buildingSource.next(localData.building);
        }
        if (this.localData.floor){
          this.floorSource.next(localData.floor);
        }
        if (this.localData.area){
          this.areaSource.next(localData.area);
        }
        if (this.localData.room){
          this.roomSource.next(localData.room);
        }
      }else{
        this.resetData();
      }
    }catch (e){
      this.resetData();
    }
  }

  private resetData = () => {
    this.localData = {};
    localStorage.setItem(this.KEY, '{}');
  }

  public setLoading = loading => {
    if(this.authService.hasSessionExpired()){
      this.loadingSource.next(false);
      if(this.enabledRoutesWithoutLogin.indexOf(this.router.url) === -1){
        this.utils.openSimpleDialog('common.sessionExpired');
        this.router.navigate([`/logout`]);
      }
    }
    this.loadingSource.next(loading);
  }

  public setBuilding = ( obj ) => {
    this.buildingSource.next(obj);
    this.localData.building = obj;
    this.floorSource.next(null);
    this.localData.floor = null;
    this.areaSource.next(null);
    this.localData.area = null;
    this.roomSource.next(null);
    this.localData.room = null;
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public setFloor = ( obj ) => {
    this.floorSource.next(obj);
    this.localData.floor = obj;
    this.areaSource.next(null);
    this.localData.area = null;
    this.roomSource.next(null);
    this.localData.room = null;
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public getFloor = () => this.localData.floor;

  public setArea = ( obj ) => {
    this.areaSource.next(obj);
    this.localData.area = obj;
    this.roomSource.next(null);
    this.localData.room = null;
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }
  
  public getArea = () => this.localData.area;

  public setRoom = ( obj ) => {
    this.roomSource.next(obj);
    this.localData.room = obj;
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public logout = () => {
    localStorage.clear();
    this.resetData();
    this.authService.logout();
    this.alarmsSubscriptionService.logout();
  }

}

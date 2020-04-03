import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlarmsSubscriptionService {

  private KEY = 'oxymetercc_alarmssubscriptiondata';

  private localData: any;

  constructor() {
    const localData: any = localStorage.getItem(this.KEY);
    if (localData && localData !== '[object Object]') {
      this.localData = JSON.parse(localData);
      console.log(this.localData);
    }else{
      this.initData();
      localStorage.setItem(this.KEY, JSON.stringify(this.localData));
    }
  }

  private initData = () => {
    this.localData = {
      areasSubscribed: {},
      roomsSubscribed: {}
    };
  }

  private resetData = () => {
    this.initData();
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public setSubscription = (key: string, obj: any, parentId?) => {
    switch (key){
      case 'area':
        this.localData.areasSubscribed[obj.id] = obj;
        break;
      case 'room':
        delete this.localData.areasSubscribed[parentId];
        this.localData.roomsSubscribed[parentId+'-'+obj.id] = obj;
        break;
    }
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public unsetSubscription = (key: string, obj: any, parentId?) => {
    switch (key){
      case 'area':
        delete this.localData.areasSubscribed[obj.id];
        Object.keys(this.localData.roomsSubscribed).forEach(k => {
          if (k.indexOf(obj.id+'-') >= 0 ){
            delete this.localData.roomsSubscribed[k];
          }
        })
        break;
      case 'room':
        delete this.localData.areasSubscribed[parentId];
        delete this.localData.roomsSubscribed[parentId+'-'+obj.id];
        break;
    }
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public isSubscribed = (key: string, obj: any, parentId?) => {
    let result = false;
    switch (key){
      case 'area':
        result = this.localData.areasSubscribed[obj.id] ? true : false;
        break;
      case 'room':
        result = this.localData.roomsSubscribed[parentId+'-'+obj.id] || this.localData.areasSubscribed[parentId] ? true : false;
        break;
    }
    return result;
  }

  public isPartialSubscribed = (key: string, obj: any) => {
    let result = false;
    switch (key){
      case 'area':
        result = !this.localData.areasSubscribed[obj.id] && this.localData.partialAreasSubscribed.indexOf(obj.id) ? true : false;
        break;
    }
    return result;
  }

  public hasRoomSubscriptions = areaId => {
    let result = false;
    if(!this.localData.areasSubscribed[areaId]){
      Object.keys(this.localData.roomsSubscribed).forEach(k => {
        if (k.indexOf(areaId+'-') >= 0 ){
          result = true;
        }
      })
    }
    return result;
  }

  public hasAnySubscription = () => Object.keys(this.localData.areasSubscribed).length 
                                    || Object.keys(this.localData.roomsSubscribed).length;


  public logout = () => this.resetData();


}

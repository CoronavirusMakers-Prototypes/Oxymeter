import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmsSubscriptionService {

  private KEY = 'oxymetercc_alarmssubscriptiondata';

  private localData: any;
  private userId: any;

  private alarmsSubscriptionForUser: any[];

  constructor(private http: HttpClient, public socketService: SocketService) {
  }

  // TODO: se puede refactorizar para que lo que almacenemos en el localStorage concuerde con lo que se devuelve en el servicio

  public loadData = () => {
    const localData: any = localStorage.getItem(this.KEY);
    if (localData && localData !== '[object Object]') {
      this.localData = JSON.parse(localData);
      console.log(this.localData);
    }else if(this.userId){
      this.initData();
      this.getAlarmsSubscriptionForUser().then( results => {
        this.alarmsSubscriptionForUser = results;
        results.forEach( r => {
          if(r.id_room){
            this.localData.roomsSubscribed[r.id_area+'-'+r.id_room] = {id: r.id_room, desc: r.room_desc};
            this.socketService.subscribeTo(`room_${r.id_room}`);
          }else if(r.id_area){
            this.localData.areasSubscribed[r.id_area] = {id: r.id_area, desc: r.area_desc};
            this.socketService.subscribeTo(`area_${r.id_area}`);
          }
        })
        localStorage.setItem(this.KEY, JSON.stringify(this.localData));
      })
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

  private deleteData = () => {
    localStorage.removeItem(this.KEY);
  }

  public setUserId = userId => {
    this.userId = userId;
    this.loadData();
  }

  public setSubscription = (key: string, obj: any, parentId?, grandFatherId?) => {
    switch (key){
      case 'area':
        this.localData.areasSubscribed[obj.id] = obj;
        this.socketService.subscribeTo(`area_${obj.id}`)
        this.addAlarmSubscription(parentId,obj.id,null);
        break;
      case 'room':
        if(this.localData.areasSubscribed[parentId]){
          delete this.localData.areasSubscribed[parentId];
          this.socketService.unsubscribe(`area_${obj.id}`);
          this.deleteAlarmSubscription(parentId,obj.id,null);
        }
        this.localData.roomsSubscribed[parentId+'-'+obj.id] = obj;
        this.socketService.subscribeTo(`room_${obj.id}`)
        this.addAlarmSubscription(grandFatherId,parentId,obj.id);
        break;
    }
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public unsetSubscription = (key: string, obj: any, parentId?, grandFatherId?) => {
    switch (key){
      case 'area':
        if(this.localData.areasSubscribed[obj.id]){
          delete this.localData.areasSubscribed[obj.id];
          this.socketService.unsubscribe(`area_${obj.id}`);
          this.deleteAlarmSubscription(parentId,obj.id,null);
        }
        Object.keys(this.localData.roomsSubscribed).forEach(k => {
          if (k.indexOf(obj.id+'-') >= 0 ){
            delete this.localData.roomsSubscribed[k];
            this.socketService.unsubscribe(`room_${k.split('-')[1]}`);
            this.deleteAlarmSubscription(parentId,obj.id,k.split('-')[1]);
          }
        })
        break;
      case 'room':
        if(this.localData.areasSubscribed[parentId]){
          delete this.localData.areasSubscribed[parentId];
          this.socketService.unsubscribe(`area_${parentId}`);
          this.deleteAlarmSubscription(grandFatherId,parentId,obj.id);
        }
        delete this.localData.roomsSubscribed[parentId+'-'+obj.id];
        this.socketService.unsubscribe(`room_${obj.id}`);
        this.deleteAlarmSubscription(grandFatherId,parentId,obj.id);
        break;
    }
    localStorage.setItem(this.KEY, JSON.stringify(this.localData));
  }

  public isSubscribed = (key: string, obj: any, parentId?) => {
    let result = false;
    switch (key){
      case 'area':
        result = this.localData.areasSubscribed[obj.id] ? true : false;
        if (!result){
          Object.keys(this.localData.roomsSubscribed).forEach( k => {
            if (k.indexOf(obj.id) === 0){
              result = true;
            };
          })
        }
        break;
      case 'room':
        result = this.localData.roomsSubscribed[parentId+'-'+obj.id] || this.localData.areasSubscribed[parentId] ? true : false;
        break;
      case 'bed':
        result = this.localData.roomsSubscribed[obj+'-'+parentId] || this.localData.areasSubscribed[obj] ? true : false;
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

  public hasAnySubscription = () => this.localData && this.localData.areasSubscribed && this.localData.roomsSubscribed && 
                                    (Object.keys(this.localData.areasSubscribed).length 
                                    || Object.keys(this.localData.roomsSubscribed).length);

  public logout = () => this.deleteData();


  /* Http requests */
  public getAlarmsSubscriptionForUser(): Promise<any>{
    const url = `/alarmSubscriptions/byIdUser/${this.userId}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(response);
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
      });
    return promise;
  }
  public addAlarmSubscription(floor_id, area_id, room_id): Promise<any>{
    const url = `/alarmSubscriptions`;
    const data = {
      id_user: parseInt(this.userId),
      id_floor: parseInt(floor_id),
      id_area: parseInt(area_id),
      id_room: floor_id ? parseInt(room_id): null
    }
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.post<any>(url, data).subscribe(
        (response) => {
          this.alarmsSubscriptionForUser = response;
          resolve(response);
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
      });
    return promise;
  }
  public deleteAlarmSubscription(floor_id, area_id, room_id): Promise<any>{
    let idToDelete = null;
    this.alarmsSubscriptionForUser.forEach(alarma => {
      if(parseInt(alarma.id_floor) === parseInt(floor_id) && parseInt(alarma.id_area) === parseInt(area_id) && ((!alarma.id_room && !room_id) || parseInt(alarma.id_room) === parseInt(room_id))){
        idToDelete = alarma.id;
      }
    })
    if(!idToDelete) return;
    const url = `/alarmSubscriptions/${idToDelete}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.delete<any>(url).subscribe(
        (response) => {
          this.alarmsSubscriptionForUser = response;
          resolve(response);
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
      });
    return promise;
  }


}

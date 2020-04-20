import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmsSubscriptionService {

  private KEY = 'oxymetercc_alarmssubscriptiondata';

  private localData: any[];
  private userId: any;

  constructor(private http: HttpClient, public socketService: SocketService) {
  }

  // TODO: se puede refactorizar para que lo que almacenemos en el localStorage concuerde con lo que se devuelve en el servicio

  public loadData = () => {
    const localData: any = localStorage.getItem(this.KEY);
    if (localData && localData !== '[object Object]') {
      this.localData = JSON.parse(localData);
    }else if (this.userId){
      this.initData();
      this.getAlarmsSubscriptionForUser().then( results => {
        results.forEach( r => {
          if (r.id_room){
            this.socketService.subscribeTo(`room_${r.id_room}`);
          }else if(r.id_area){
            this.socketService.subscribeTo(`area_${r.id_area}`);
          }
        });
        this.localData = results;
        localStorage.setItem(this.KEY, JSON.stringify(results));
      });
    }
  }

  private initData = () => {
    this.localData = [];
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

  public setSubscription = (id_floor, id_area, id_room = null) => {
    if (id_room){
      this.socketService.subscribeTo(`room_${id_room}`);
    }else if (id_area){
      this.socketService.subscribeTo(`area_${id_area}`)
    }
    this.addAlarmSubscription(id_floor, id_area, id_room);
  }

  public unsetSubscription = (id_floor, id_area, id_room = null) => {
    if (id_room){
      this.socketService.unsubscribe(`room_${id_room}`);
    }else if (id_area){
      this.socketService.unsubscribe(`area_${id_area}`);
    }
    this.deleteAlarmSubscription(id_floor, id_area, id_room);
  }

  public isSubscribed = (id_area, id_room = null) => {
    let result = false;
    if(!Array.isArray(this.localData)) {
      return false;
    }
    this.localData.forEach( d => {
      if(id_area && id_room && parseInt(id_area) === parseInt(d.id_area) 
        && (!d.id_room || parseInt(d.id_room) === parseInt(id_room) )){
        result = true;
      }else if(id_area && !id_room && parseInt(id_area) === parseInt(d.id_area)){
        result = true;
      }
    })
    return result;
  }

  public hasRoomSubscriptions = areaId => {
    if( !this.localData || !Array.isArray(this.localData)){ return false; }
    const hasRooms = this.localData.filter(d => parseInt(d.id_area) === parseInt(areaId) && d.id_room );
    return hasRooms.length > 0;
  }

  public hasAnySubscription = () => this.localData && this.localData.length > 0;

  public logout = () => this.deleteData();


  /* Http requests */
  public getAlarmsSubscriptionForUser(): Promise<any>{
    const url = `/alarms/suscriptions/byIdUser/${this.userId}`;
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
    const url = `/alarms/suscriptions`;
    const data = {
      id_user: parseInt(this.userId),
      id_floor: parseInt(floor_id),
      id_area: parseInt(area_id),
      id_room: floor_id ? parseInt(room_id): null
    };
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.post<any>(url, data).subscribe(
        (response) => {
          this.localData = response;
          localStorage.setItem(this.KEY, JSON.stringify(response));
          resolve(response);
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
      });
    return promise;
  }
  public deleteAlarmSubscription(floor_id, area_id, room_id){
    let idToDelete = [];
    this.localData.forEach(alarma => {
      if(parseInt(alarma.id_floor) === parseInt(floor_id) && parseInt(alarma.id_area) === parseInt(area_id)
       && (!alarma.id_room || parseInt(alarma.id_room) === parseInt(room_id))){
        idToDelete.push(alarma.id);
      }
    })
    idToDelete.forEach( id => {
      let url = `/alarms/suscriptions/${id}`;
      this.http.delete<any>(url).subscribe(
        (response) => {
          this.localData = response;
          localStorage.setItem(this.KEY, JSON.stringify(response));
        },
        (error) => { // Función de fallo en la petición
          console.log(error);
        }
      );
    });
  }
}

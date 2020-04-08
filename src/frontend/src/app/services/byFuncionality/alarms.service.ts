import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../socket/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  private KEY = 'oxymetercc_alarmsdata';

  private userId: any;

  private localData: any[];

  constructor(private http: HttpClient, public socketService: SocketService) {
  }

  public initData = () => {
    this.localData = [];
  }

  public loadData = () => {
    const localData: any = localStorage.getItem(this.KEY);
    if (localData && localData !== '[object Object]') {
      this.localData = JSON.parse(localData);
    }else if(this.userId){
      this.initData();
      this.getAlarmsForUser().then( results => {
        this.localData = results;
      })
      localStorage.setItem(this.KEY, JSON.stringify(this.localData));
    }
  }

  public setUserId = (userId) => {
    this.userId = userId;
    this.loadData();
  }

  public getAlarmsForUser(): Promise<any>{
    const url = `/alarms/byIdUser/${this.userId}`;
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

  public getData = () => this.localData;

}

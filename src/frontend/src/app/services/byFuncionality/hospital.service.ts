import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }
  // TODO: quitar
  private modifyResponse = response => {
    if(response && Array.isArray(response) && response.length > 0 && response[0].description){
      response.map( r => r.desc = r.description);
    }
    return response;
  }
  public getHospitals(): Promise<any[]>{
    const url = '/hospitals';
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getHospitalById(id): Promise<any>{
    const url = `/hospitals/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getBuildings (id): Promise<any[]>{
    const url = `/builds/byIdHospital/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getFloors (id): Promise<any[]>{
    const url = `/floors/byIdBuilding/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getAreas (id): Promise<any[]>{
    const url = `/areas/byIdFloor/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getRooms (id): Promise<any[]>{
    const url = `/rooms/byIdArea/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  public getBeds (id): Promise<any[]>{
    const url = `/beds/byIdRoom/${id}`;
    const promise = new Promise<any[]>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
  
  public add(url, data): Promise<any>{
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post<any>(url, data).subscribe(
        (response) => {
            resolve(this.modifyResponse(response));
        },
        (error) => { 
            reject(error);
        }
      );
      });
    return promise;
  }
}

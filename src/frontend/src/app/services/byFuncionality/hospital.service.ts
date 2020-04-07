import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }
  public getHospitals(): Promise<any[]>{
    const url = '/hospitals';
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
  public getHospitalById(id): Promise<any>{
    const url = `/hospitals/${id}`;
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
  public getBuildings (id): Promise<any[]>{
    const url = `/buildingsByIdHospital/${id}`;
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
  public getFloors (id): Promise<any[]>{
    const url = `/floorsByIdBuilding/${id}`;
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
  public getAreas (id): Promise<any[]>{
    const url = `/areasByIdFloor/${id}`;
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
  public getRooms (id): Promise<any[]>{
    const url = `/roomsByIdArea/${id}`;
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
  public getBeds (id): Promise<any[]>{
    const url = `/bedsByIdRoom/${id}`;
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
}

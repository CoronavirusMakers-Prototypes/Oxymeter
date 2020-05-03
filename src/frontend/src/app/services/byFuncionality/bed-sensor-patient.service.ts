import { Injectable } from '@angular/core';
import { Patient } from '@app/class/Patient';
import { Meassurement } from '@app/class/Meassurement';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedSensorPatientService {

  constructor(private http: HttpClient) { }

  public getPatientByBedId(idBed): Promise<Patient>{
    const url = `/patients/byIdBed/${idBed}`;
    const promise = new Promise<Patient>((resolve, reject) => {
      this.http.get<Patient>(url).subscribe(
        (response) => {
          resolve(new Patient(response));
        },
        (error) => {
            reject(error);
        }
      );
      });
    return promise;
  }

  public getSensorData(idSensor, time?): Promise<any>{
    const timeToSend = time ? time : new Date().getTime();
    const url = `/meassurement/byIdSensor/${idSensor}?lastTimestamp=${timeToSend}`;
    const promise = new Promise<any>((resolve, reject) => {
      this.http.get<any>(url).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
            reject(error);
        }
      );
      });
    return promise;
  }

  public savePatient(patient: Patient): Promise<any>{
    const url = `/patients`;
    const promise = new Promise<any>((resolve, reject) => {
      this.http.post<any>(url, patient.getObject()).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
            reject(error);
        }
      );
    });
    return promise;
  }

  public updatePatient(patient: Patient): Promise<any>{
    const url = `/patients/${patient.getId()}`;
    const promise = new Promise<any>((resolve, reject) => {
      this.http.put<any>(url, patient.getObject()).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
            reject(error);
        }
      );
    });
    return promise;
  }
}

import { Injectable } from '@angular/core';
import { Patient } from '@app/class/Patient';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedSensorPatientService {

  constructor(private http: HttpClient) { }

  public getPatientByBedId(idBed): Promise<Patient>{
    const url = `/patientByIdBed/${idBed}`;
    const promise = new Promise<Patient>((resolve, reject) => {
      this.http.get<Patient>(url).subscribe(
        (response) => {
          resolve(new Patient(response));
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
      });
    return promise;
  }
}

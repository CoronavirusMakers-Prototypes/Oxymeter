import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@class/User';
import * as cryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userData: User;
  private token: string;
  private KEY = 'oxymetercc';

  // TODO: ¿cómo mando password SHA256?

  constructor(private http: HttpClient) {
    // TODO: ¿session or localstorage?
    const localData = localStorage.getItem(this.KEY);
    if (localData && localData !== '[object Object]') {
      const localDataObject: any = JSON.parse(localData);
      this.userData = new User(localDataObject.user);
      this.token = localDataObject.token;
    }
    if (!localData || localData === '[object Object]') {
      this.resetData();
    }
  }

  public resetData = () => {
    this.userData = new User();
    localStorage.setItem(this.KEY, this.userData.toString());
  }

  public getData(): User {
    return this.userData;
  }

  public getRole(): string {
    return this.userData.getRole();
  }

  public hasPermiso(role): boolean {
    return this.userData.getRole() === role;
  }

  public setUserData = (data: User) => {
    this.userData = data;
    localStorage.setItem(this.KEY, data.toString());
  }

  public getId = () => this.userData.getId();

  public getToken = () => this.token;

  public login(user: string, password: string): Promise<User>{
    const url = '/login';
    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, {user: user, pass: cryptoJS.SHA256(password)}).subscribe(
        (response) => {
            // Se resuelve la promesa
            if(response.user && response.token){
              this.setUserData(new User(response.user))
              this.token = response.token;
              resolve(response.user);
            }
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
    });
    return promise;
  }

  public logout = () => this.resetData();

}

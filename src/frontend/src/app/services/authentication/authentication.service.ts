import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@class/User';
import * as cryptoJS from 'crypto-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userData: User;
  private token: string;
  private sessionIni: any;
  private KEY = 'oxymetercc_userdata';
  private sessionExpiration = 2*60*60*1000; // 8 horas

  private loggedSource = new BehaviorSubject<boolean>(false);
  logged$ = this.loggedSource.asObservable();

  constructor(private http: HttpClient) {
    try{
      let localData: any = localStorage.getItem(this.KEY);
      if (localData && localData !== '[object Object]') {
        localData = JSON.parse(localData);
      }
      if(localData.token && localData.user){
        this.userData = new User(localData.user);
        this.token = localData.token;
        this.sessionIni = localData.sessionIni;
        this.loggedSource.next(true);
      }
      if (!localData || localData === '[object Object]') {
        this.resetData();
      }
    }catch (e){
      this.resetData();
    }
  }

  public isAuthenticated(): boolean {
    if (this.token){ return true; }
    return false;
  }

  public resetData = () => {
    this.userData = new User();
    this.token = null;
    const obj = {
      user: this.userData.toString(),
      token: null,
      sessionIni: null
    };
    localStorage.setItem(this.KEY, JSON.stringify(obj));
    this.loggedSource.next(false);
  }

  public getData(): User {
    return this.userData;
  }

  public getRole(): string {
    return this.userData.getRole();
  }

  public hasRole(role): boolean {
    return this.userData.getRole() === role;
  }

  public hasSessionExpired = () => {
    if(!this.sessionIni || this.sessionIni+this.sessionExpiration < new Date().getTime()){
      return true;
    }
    return false;
  }

  public setUserData = (data: User, token?) => {
    this.userData = data;
    if(token){ this.token = token; }
    this.sessionIni = new Date().getTime();
    const obj = {
      user: data.getObject(),
      token: token ? token : this.token,
      sessionIni: this.sessionIni
    }
    localStorage.setItem(this.KEY, JSON.stringify(obj));
  }

  public getId = () => this.userData.getId();

  public getToken = () => this.token;

  public getHospitalId = () => this.userData.getIdHospital();

  public hasPermission = (permission: string) => {
    // editHospitalStructure, 
    let role = this.userData.getRole();
    role = 'editor';
    if ( role === 'superadmin'){
      return true;
    }else if ( role === 'editor' &&
    (permission === 'editPacient' || permission === 'addPacient')){
      return true;
    }else if ( role === 'viewer' ){
      return false;
    }else{
      // TODO: devolver false
      return false;
    }
  }

  public login(login: string, password: string): Promise<User>{
    const url = '/users/login';
    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, {login: login, password: cryptoJS.SHA256(password).toString()}).subscribe(
        (response) => {
            // Se resuelve la promesa
            if (response.user && response.token){
              this.setUserData(new User(response.user), response.token);
              this.loggedSource.next(true);
              resolve(this.getData());
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

  public registerUser = ( user: User, password: string) => {
    const url = '/users/signin';
    const data = { ...user.getObject(), password: cryptoJS.SHA256(password).toString() };
    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, data).subscribe(
        (response) => {
            // Se resuelve la promesa
            if (response.user && response.token){
              this.setUserData(new User(response.user), response.token);
              this.loggedSource.next(true);
              resolve(new User(response.user));
            }
        },
        (error) => { // Función de fallo en la petición
            reject(error);
        }
      );
    });
    return promise;
  }

}

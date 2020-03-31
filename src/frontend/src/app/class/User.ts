export class User {
  private id: string;
  private surname: string;
  private lastname: string;
  private professionalId: string;
  private lastLogin: number;
  private role: string;
  private login: string;
  private idHospital: string;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.surname = obj.surname;
      this.lastname = obj.lastname;
      this.professionalId = obj.professionalId;
      this.lastLogin = obj.lastLogin;
      this.role = obj.role;
      this.login = obj.login;
      this.idHospital = obj.idHospital;
    }
  }

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getSurname(): string {
    return this.surname;
  }

  public setSurname(surname: string): void {
    this.surname = surname;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  public getProfessionalId(): string {
    return this.professionalId;
  }

  public setProfessionalId(professionalId: string): void {
    this.professionalId = professionalId;
  }

  public getLastLogin(): number {
    return this.lastLogin;
  }

  public setLastLogin(lastLogin: number): void {
    this.lastLogin = lastLogin;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string): void {
    this.role = role;
  }

  public getLogin(): string {
    return this.login;
  }

  public setLogin(login: string): void {
    this.login = login;
  }

  public getIdHospital(): string {
    return this.idHospital;
  }

  public setIdHospital(idHospital: string): void {
    this.idHospital = idHospital;
  }

  public getObject(): any {
    const userData = {
      id: this.id,
      surname: this.surname,
      lastname: this.lastname,
      professionalId: this.professionalId,
      lastLogin: this.lastLogin,
      role: this.role,
      login: this.login,
      idHospital: this.idHospital
    };
    return userData;
  }

  public toString(): string {
    return JSON.stringify(this.getObject());
  }
}

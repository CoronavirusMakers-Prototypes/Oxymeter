export class User {
  private id: string;
  private surname: string;
  private lastname: string;
  private professional_id: string;
  private lastLogin: number;
  private role: string;
  private login: string;
  private id_hospital: string;

  constructor(obj?) {
    if (obj) {
      this.id = obj.id;
      this.surname = obj.surname;
      this.lastname = obj.lastname;
      this.professional_id = obj.professional_id;
      this.lastLogin = obj.lastLogin;
      this.role = obj.role;
      this.login = obj.login;
      this.id_hospital = obj.id_hospital;
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
    return this.professional_id;
  }

  public setProfessionalId(professional_id: string): void {
    this.professional_id = professional_id;
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
    return this.id_hospital;
  }

  public setIdHospital(id_hospital: string): void {
    this.id_hospital = id_hospital;
  }

  public getObject(): any {
    const userData = {
      id: this.id,
      surname: this.surname,
      lastname: this.lastname,
      professional_id: this.professional_id,
      lastLogin: this.lastLogin,
      role: this.role,
      login: this.login,
      id_hospital: this.id_hospital
    };
    return userData;
  }

  public toString(): string {
    return JSON.stringify(this.getObject());
  }
}

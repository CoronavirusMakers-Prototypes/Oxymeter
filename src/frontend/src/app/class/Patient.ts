export class Patient {
  private id: number; 
  public surname: string;
  public lastname: string;
  public hospital_reference: string;
  public suscribed: number;
  public unsuscribed: number;
  public id_bed: number;
  public id_sensor: number;
  public spo2_max: number;
  public spo2_min: number;
  public pulse_max: number;
  public pulse_min: number;
  public temp_max: number;
  public temp_min: number;
  public status: number;

  constructor(obj?) {
    if (obj) {
        this.id = obj.id ? obj.id : null;
        this.surname = obj.surname ? obj.surname : '';
        this.lastname = obj.lastname ? obj.lastname : '';
        this.hospital_reference = obj.hospital_reference ? obj.hospital_reference : '';
        this.suscribed = obj.suscribed  ? obj.suscribed  : null;
        this.unsuscribed = obj.unsuscribed ? obj.unsuscribed : null;
        this.id_bed = obj.id_bed ? obj.id_bed : null;
        this.id_sensor = obj.id_sensor ? obj.id_sensor : null;
        this.spo2_max = obj.spo2_max ? obj.spo2_max : 99;
        this.spo2_min = obj.spo2_min ? obj.spo2_min : 90;
        this.pulse_max = obj.pulse_max ? obj.pulse_max : 90;
        this.pulse_min = obj.pulse_min ? obj.pulse_min : 65;
        this.temp_max = obj.temp_max ? obj.temp_max : 36.9;
        this.temp_min = obj.temp_min ? obj.temp_min : 34;
        this.status = obj.status ? obj.status : null;
    }
  }

  public getId(): number {
    return this.id;
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

  public getHospital_reference(): string {
    return this.hospital_reference;
  }

  public setHospital_reference(hospital_reference: string): void {
    this.hospital_reference = hospital_reference;
  }

  public getSuscribed(): number {
    return this.suscribed;
  }

  public setSuscribed(suscribed: number): void {
    this.suscribed = suscribed;
  }

  public getUnsuscribed(): number {
    return this.unsuscribed;
  }

  public setUnsuscribed(unsuscribed: number): void {
    this.unsuscribed = unsuscribed;
  }

  public getId_bed(): number {
    return this.id_bed;
  }

  public setId_bed(id_bed: number): void {
    this.id_bed = id_bed;
  }

  public getId_sensor(): number {
    return this.id_sensor;
  }

  public setId_sensor(id_sensor: number): void {
    this.id_sensor = id_sensor;
  }

  public getSpo2_max(): number {
    return this.spo2_max;
  }

  public setSpo2_max(spo2_max: number): void {
    this.spo2_max = spo2_max;
  }

  public getSpo2_min(): number {
    return this.spo2_min;
  }

  public setSpo2_min(spo2_min: number): void {
    this.spo2_min = spo2_min;
  }

  public getPulse_max(): number {
    return this.pulse_max;
  }

  public setPulse_max(pulse_max: number): void {
    this.pulse_max = pulse_max;
  }

  public getPulse_min(): number {
    return this.pulse_min;
  }

  public setPulse_min(pulse_min: number): void {
    this.pulse_min = pulse_min;
  }

  public getTemp_max(): number {
    return this.temp_max;
  }

  public setTemp_max(temp_max: number): void {
    this.temp_max = temp_max;
  }

  public getTemp_min(): number {
    return this.temp_min;
  }

  public setTemp_min(temp_min: number): void {
    this.temp_min = temp_min;
  }

  public getStatus(): number {
    return this.status;
  }

  public setStatus(status: number): void {
    this.status = status;
  }

  public getObject(): any {
    const patientData = {
      surname: this.surname,
      lastname: this.lastname,
      hospital_reference: this.hospital_reference,
      suscribed: this.suscribed,
      unsuscribed: this.unsuscribed,
      id_bed: this.id_bed,
      id_sensor: this.id_sensor,
      spo2_max: this.spo2_max,
      spo2_min: this.spo2_min,
      pulse_max: this.pulse_max,
      pulse_min: this.pulse_min,
      temp_max: this.temp_max,
      temp_min: this.temp_min,
      status: this.status
    };
    return patientData;
  }

  public toString(): string {
    return JSON.stringify(this.getObject());
  }
}

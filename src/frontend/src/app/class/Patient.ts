export class Patient {
  private surname: string;
  private lastname: string;
  private hospital_reference: string;
  private suscribed: number;
  private unsuscribed: number;
  private id_bed: number;
  private id_sensor: number;
  private spo2_max: number;
  private spo2_min: number;
  private pulse_max: number;
  private pulse_min: number;
  private temp_max: number;
  private temp_min: number;
  private status: number;

  constructor(obj?) {
    if (obj) {
        this.surname = obj.surname;
        this.lastname = obj.lastname;
        this.hospital_reference = obj.hospital_reference;
        this.suscribed = obj.suscribed;
        this.unsuscribed = obj.unsuscribed;
        this.id_bed = obj.id_bed;
        this.id_sensor = obj.id_sensor;
        this.spo2_max = obj.spo2_max;
        this.spo2_min = obj.spo2_min;
        this.pulse_max = obj.pulse_max;
        this.pulse_min = obj.pulse_min;
        this.temp_max = obj.temp_max;
        this.temp_min = obj.temp_min;
        this.status = obj.status;
    }
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

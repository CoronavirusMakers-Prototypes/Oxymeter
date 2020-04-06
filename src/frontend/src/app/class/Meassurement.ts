export class Meassurement {

    private id: number;
    private time: number;
    private spo2: number;
    private ppm: number;
    private batt: number;
    private temp: number;
    private sequence: number;
    private sensorId: number;
  
    constructor(obj?) {
        if (obj) {
            this.id = obj.id;
            this.time = obj.time;
            this.spo2 = obj.spo2;
            this.ppm = obj.ppm;
            this.batt = obj.batt;
            this.temp = obj.temp;
            this.sequence = obj.sequence;
            this.sensorId = obj.sensorId;
        }
      }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTime(): number {
        return this.time;
    }

    public setTime(time: number): void {
        this.time = time;
    }

    public getSpo2(): number {
        return this.spo2;
    }

    public setSpo2(spo2: number): void {
        this.spo2 = spo2;
    }

    public getPpm(): number {
        return this.ppm;
    }

    public setPpm(ppm: number): void {
        this.ppm = ppm;
    }

    public getBatt(): number {
        return this.batt;
    }

    public setBatt(batt: number): void {
        this.batt = batt;
    }

    public getTemp(): number {
        return this.temp;
    }

    public setTemp(temp: number): void {
        this.temp = temp;
    }

    public getSequence(): number {
        return this.sequence;
    }

    public setSequence(sequence: number): void {
        this.sequence = sequence;
    }

    public getSensorId(): number {
        return this.sensorId;
    }

    public setSensorId(sensorId: number): void {
        this.sensorId = sensorId;
    }
  
    public getObject(): any {
      const userData = {
            id: this.id,
            time: this.time,
            spo2: this.spo2,
            ppm: this.ppm,
            batt: this.batt,
            temp: this.temp,
            sequence: this.sequence,
            sensorId: this.sensorId
      };
      return userData;
    }
  
    public toString(): string {
      return JSON.stringify(this.getObject());
    }
  }
  
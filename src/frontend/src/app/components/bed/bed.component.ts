import { Component, OnInit } from '@angular/core';
import { BedSensorPatientService } from '@services/byFuncionality/bed-sensor-patient.service';
import { Patient } from '@app/class/Patient';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit {

  public idBed: string;
  public patientData: Patient;
  public activeServices = 0;

  constructor(public bedService: BedSensorPatientService,
              public globalService: GlobalService,
              private route: ActivatedRoute) {
    this.idBed = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.globalService.setLoading(true);
    this.activeServices++;
    this.bedService.getPatientByBedId(this.idBed).then(result => {
      this.patientData = result;
      this.waitingForServices();
    }).catch(error => {
      this.waitingForServices();
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

  private  waitingForServices = () => {
    this.activeServices--;
    if(this.activeServices <= 0){
      this.activeServices = 0;
      this.globalService.setLoading(false);
    }
  }

}

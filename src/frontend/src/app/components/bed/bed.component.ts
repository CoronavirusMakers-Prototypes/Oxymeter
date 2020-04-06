import { Component, OnInit } from '@angular/core';
import { BedSensorPatientService } from '@services/byFuncionality/bed-sensor-patient.service';
import { Patient } from '@app/class/Patient';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];
  lineChartOptions = {
    responsive: true,
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0)',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';




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
    this.activeServices = 2;
    this.getPatientData();
  }

  private getPatientData = () => {
    this.bedService.getPatientByBedId(this.idBed).then(result => {
      this.patientData = result;
      this.waitingForServices();
      this.getSensorMeassurements(result.getId_sensor());
    }).catch(error => {
      this.waitingForServices();
      this.waitingForServices();
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

  private getSensorMeassurements = (idSensor) => {
    this.bedService.getSensorData(idSensor).then(result => {
      this.setDataForGraphics(result.result);
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

  private setDataForGraphics = (data) => {

  }

}

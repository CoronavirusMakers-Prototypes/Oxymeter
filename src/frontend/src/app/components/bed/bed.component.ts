import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { BedSensorPatientService } from '@services/byFuncionality/bed-sensor-patient.service';
import { Patient } from '@app/class/Patient';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit, AfterViewInit, OnDestroy {

  public lineChartCanvasSet = {};
  public chartsToDraw = ['lineChartSPO2', 'lineChartPPM', 'lineChartTEMP'];
  public charts = {};
  public idBed: string;
  public patientData: Patient;
  public activeServices = 0;
  public canvasWidth = 100;
  public canvasWidthRelation = 4;
  public sensorData = [];
  private bedSubscription: Subscription;

  
  public chartData = {
    lineChartSPO2: {
      labels: [],
      datasets: [{
        label: 'SPO2 ',
        fill: false,
        data: [],
        backgroundColor: '#6058FF',
        borderColor: '#6058FF'
      },
      {
        label: "Min",
        fill: false,
        pointRadius: 0,
        data: []
      },
      {
        label: "Max",
        fill: false,
        pointRadius: 0,
        data: []
      }]
    },
    lineChartPPM: {
      labels: [],
      datasets: [{
        label: 'PPM ',
        fill: false,
        data: [],
        backgroundColor: '#6058FF',
        borderColor: '#6058FF'
      },
      {
        label: "Min",
        fill: false,
        pointRadius: 0,
        data: []
      },
      {
        label: "Max",
        fill: false,
        pointRadius: 0,
        data: []
      }]
    },
    lineChartTEMP: {
      labels: [],
      datasets: [{
        label: 'Temp ',
        fill: false,
        data: [],
        backgroundColor: '#6058FF',
        borderColor: '#6058FF'
      },
      {
        label: "Min",
        fill: false,
        pointRadius: 0,
        data: []
      },
      {
        label: "Max",
        fill: false,
        pointRadius: 0,
        data: []
      }]
    }
  };


  constructor(public bedService: BedSensorPatientService,
              public globalService: GlobalService,
              private route: ActivatedRoute) {
    this.idBed = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.chartsToDraw.forEach( chart => {
      this.newChart(chart, <HTMLCanvasElement>document.getElementById(chart));
    });
    this.globalService.setLoading(true);
    this.activeServices = 2;
    this.getPatientData();
  }

  ngAfterViewInit(): void {
    this.bedSubscription = this.globalService.alarmsService.socketService.bedDataEvent$.subscribe( value => {
      this.sensorData.push(value);
      this.addData(value);
      console.log(value)
    });
  }

  ngOnDestroy(): void{
    this.globalService.alarmsService.socketService.unSubscribeToBed();   
    this.bedSubscription.unsubscribe();
  }

  private newChart = (chart: string, elementOrContext: any) => {
    let max, min;
    switch(chart){
      case 'lineChartSPO2':
        max = 120;
        min = 70;
        break;
      case 'lineChartPPM':
        max = 150;
        min = 40;
        break;
      case 'lineChartTEMP':
        max = 41;
        min = 32;
        break;
    }
    this.charts[chart] = new Chart(elementOrContext, {
      type: 'line',
      data: this.chartData[chart],
      options: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          titleFontSize: 0,
          titleMarginBottom: 0,
          bodyFontSize: 12
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: false,
              display: true,
              min: min,
              max: max
            }
          }]
        },
        animation: {
          onComplete: () => { this.lineChartComplete(chart) },
          onProgress: () => { this.lineChartProgress(chart) }
        }
      }
    });
  }

  private getPatientData = () => {
    this.bedService.getPatientByBedId(this.idBed).then(result => {
      let data = result;
      if(Array.isArray(result) && result.length > 0){
        data = result[0];
      }else if (Array.isArray(result) && result.length === 0){
        data = null;
      }
      this.patientData = data;
      this.waitingForServices();
      if(data.getId_bed()){
        this.globalService.alarmsService.socketService.subscribeToBed(data.getId_bed());       
        this.sensorData = this.globalService.alarmsService.socketService.getLastDataForBed(data.getId_bed());
        this.sensorData.forEach( data => {
          this.addData(data);
        });
        this.waitingForServices();
      }else{
        this.waitingForServices();
      }
    }).catch(error => {
      this.waitingForServices();
      this.waitingForServices();
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

  private waitingForServices = () => {
    this.activeServices--;
    if (this.activeServices <= 0) {
      this.activeServices = 0;
      this.globalService.setLoading(false);
    }
  }

  public lineChartComplete = (id) => {
    if (!this.lineChartCanvasSet[id]) {
      const chartTest = this.charts[id];
      const scale = window.devicePixelRatio;
      let sourceCanvas = chartTest.chart.canvas;
      let copyWidth = chartTest.scales['y-axis-0'].width - 2;
      let copyHeight = chartTest.scales['y-axis-0'].height + chartTest.scales['y-axis-0'].top + 10;
      let target: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(id+"yaxe");
      let targetCtx = target.getContext("2d");

      targetCtx.scale(scale, scale);
      targetCtx.canvas.width = copyWidth * scale;
      targetCtx.canvas.height = copyHeight * scale;

      targetCtx.canvas.style.width = `${copyWidth}px`;
      targetCtx.canvas.style.height = `${copyHeight}px`;
      targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);

      let sourceCtx = sourceCanvas.getContext('2d');

      sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
      this.lineChartCanvasSet[id] = true;
    }
  }

  public lineChartProgress = (id) => {
    if (this.lineChartCanvasSet[id] === true) {
      const chartTest = this.charts[id];
      var copyWidth = chartTest.scales['y-axis-0'].width;
      var copyHeight = chartTest.scales['y-axis-0'].height + chartTest.scales['y-axis-0'].top + 10;
      var sourceCtx = chartTest.chart.canvas.getContext('2d');
      sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
    }
  }

  addData = (data) => {
      if(!data) return;
      this.canvasWidth = this.sensorData.length * this.canvasWidthRelation > 100 ? this.sensorData.length * this.canvasWidthRelation : 100;
      let date = new Date(data.time);
      let strDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      this.chartsToDraw.forEach( chart => {
        if(this.charts[chart] && this.patientData){
          let attr = '';
          let max = null;
          let min = null;
          switch(chart){
            case 'lineChartSPO2':
              attr = 'spo2';
              max = this.patientData.getSpo2_max();
              min = this.patientData.getSpo2_min();
              break;
            case 'lineChartPPM':
              attr = 'ppm';
              max = this.patientData.getPulse_max();
              min = this.patientData.getPulse_min();
              break;
            case 'lineChartTEMP':
              attr = 'temp';
              max = this.patientData.getTemp_max();
              min = this.patientData.getTemp_min();
              break;
          }
          this.chartData[chart].labels.push(strDate);
          this.chartData[chart].datasets[0].data.push(data[attr]);
          this.chartData[chart].datasets[1].data.push(min);
          this.chartData[chart].datasets[2].data.push(max);
          this.charts[chart].update();
        }
      });
  }

  public hasAlarm = status => {
    return this.globalService.alarmsService.getAlarmsForBed(this.patientData.getId_bed()).filter( a => a.status === status).length > 0;
  }

}

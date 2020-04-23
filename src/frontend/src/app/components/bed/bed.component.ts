import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BedSensorPatientService } from '@services/byFuncionality/bed-sensor-patient.service';
import { Patient } from '@app/class/Patient';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.scss']
})
export class BedComponent implements OnInit, AfterViewInit {

  public lineChartCanvasSet = {};
  public chartsToDraw = ['lineChartSPO2', 'lineChartPPM', 'lineChartTEMP'];
  public charts = {};
  public idBed: string;
  public patientData: Patient;
  public activeServices = 0;
  public canvasWidth = 100;
  public canvasWidthRelation = 4;

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

  ngAfterViewInit(): void {
    this.chartsToDraw.forEach( chart => {
      this.newChart(chart, <HTMLCanvasElement>document.getElementById(chart));
    });

    this.addData();
  }

  private newChart = (chart: string, elementOrContext: any) => {
    this.generateData();
    this.charts[chart] = new Chart(elementOrContext, {
      type: 'line',
      data: this.chartData,
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
              beginAtZero: true,
              display: true
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
      if(data.getId_sensor()){
        this.getSensorMeassurements(result.getId_sensor());
      }else{
        this.waitingForServices();
      }
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

  private waitingForServices = () => {
    this.activeServices--;
    if (this.activeServices <= 0) {
      this.activeServices = 0;
      this.globalService.setLoading(false);
    }
  }

  private setDataForGraphics = (data) => {

  }

  public lineChartComplete = (id) => {
    if (!this.lineChartCanvasSet[id]) {
      const chartTest = this.charts[id];
      const scale = window.devicePixelRatio;
      let sourceCanvas = chartTest.chart.canvas;
      let copyWidth = chartTest.scales['y-axis-0'].width - 5;
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
      /*let chart = <HTMLCanvasElement>document.getElementById(id);
      let ctx = chart.getContext('2d');
      ctx.canvas.width = document.getElementsByClassName('canvas-wrapper')[0].clientWidth;
      this.newChart(id, ctx);*/
      const chartTest = this.charts[id];
      var copyWidth = chartTest.scales['y-axis-0'].width;
      var copyHeight = chartTest.scales['y-axis-0'].height + chartTest.scales['y-axis-0'].top + 10;
      var sourceCtx = chartTest.chart.canvas.getContext('2d');
      sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
    }
  }


  generateLabels = () => {
    let chartLabels = [];
    for (let x = 0; x < 60; x++) {
      chartLabels.push("Label " + x);
    }
    return chartLabels;
  }

  generateData = () => {
    let numb = 60;
    this.canvasWidth = numb * this.canvasWidthRelation > 100 ? numb * this.canvasWidthRelation : 100;
    for (let x = 0; x < 60; x++) {
      this.chartData.datasets[0].data.push(Math.floor((Math.random() * 100) + 1));
      this.chartData.datasets[1].data.push(20);
      this.chartData.datasets[2].data.push(80);
    }
  }

  public count = 59;
  addData = () => {
    setTimeout( () => {
      this.count++;
      this.canvasWidth = this.count * this.canvasWidthRelation > 100 ? this.count * this.canvasWidthRelation : 100;
      this.chartData.labels.push("Label "+this.count);
      this.chartData.datasets[0].data.push(Math.floor((Math.random() * 100) + 1));
      this.chartData.datasets[1].data.push(20);
      this.chartData.datasets[2].data.push(80);
      this.chartsToDraw.forEach( chart => {
        this.charts[chart].update();
      });
      this.addData();
    }, 5000);
  }


  public chartData = {
    labels: this.generateLabels(),
    datasets: [{
      label: "Test Data Set",
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
  };


}

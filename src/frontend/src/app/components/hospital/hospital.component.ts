import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss']
})
export class HospitalComponent implements OnInit {

  public buildings: any[];

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
    this.globalService.hospitalService.getBuildings(this.globalService.authService.getHospitalId()).then(result => {
      this.buildings = result;
    }).catch(e => {
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

}

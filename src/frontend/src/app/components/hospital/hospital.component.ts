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
    this.getBuildings();
  }

  getBuildings = () => {
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getBuildings(this.globalService.authService.getHospitalId()).then(result => {
      this.buildings = result;
      this.globalService.setLoading(false);
    }).catch(e => {
      this.globalService.utils.openSimpleDialog('error.server-error');
      this.globalService.setLoading(false);
    });
  }

  addBuilding = () => {
    this.globalService.utils.openFormDialog(null, 'actions.addBuilding').then(result => {
      if(result){
        this.globalService.setLoading(true);
        let data =  {desc: result, id_hospital: this.globalService.authService.getHospitalId()};
        this.globalService.hospitalService.add('/builds', data).then(result => {
          this.getBuildings();
        }).catch(error => {
          console.log(error);
          this.globalService.setLoading(false);
          this.globalService.utils.openSimpleDialog('error.server-error')
        })
      }
    })
  }

}

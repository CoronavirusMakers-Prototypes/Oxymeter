import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  public areas: any[];
  public paramId: string;
  constructor(public globalService: GlobalService, private route: ActivatedRoute) { 
    this.paramId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getAreas();
  }

  getAreas = () => {
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getAreas(this.paramId).then(results => {
      this.globalService.setLoading(false);
      this.areas = results;
    }).catch(e => {
      this.globalService.setLoading(false);
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

  addArea = () => {
    this.globalService.utils.openFormDialog(null, 'actions.addArea').then(result => {
      if(result){
        this.globalService.setLoading(true);
        const data =  {desc: result, id_floor: parseInt(this.paramId)};
        this.globalService.hospitalService.add('/areas', data).then(result => {
          this.getAreas();
        }).catch(error => {
          console.log(error);
          this.globalService.setLoading(false);
          this.globalService.utils.openSimpleDialog('error.server-error')
        })
      }
    })
  }

}

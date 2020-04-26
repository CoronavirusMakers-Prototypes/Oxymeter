import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {

  public floors: any[];
  public paramId: string;
  constructor(public globalService: GlobalService, private route: ActivatedRoute) { 
    this.paramId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getFloors();
  }

  getFloors = () => {
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getFloors(this.paramId).then(results => {
      this.globalService.setLoading(false);
      this.floors = results;
    }).catch(e => {
      this.globalService.setLoading(false);
      this.globalService.utils.openSimpleDialog('error.server-error');
    });

  }

  addFloor = () => {
    this.globalService.utils.openFormDialog(null, 'actions.addFloor').then(result => {
      if(result){
        this.globalService.setLoading(true);
        const data =  {desc: result, id_build: parseInt(this.paramId)};
        this.globalService.hospitalService.add('/floors', data).then(result => {
          this.getFloors();
        }).catch(error => {
          console.log(error);
          this.globalService.setLoading(false);
          this.globalService.utils.openSimpleDialog('error.server-error')
        })
      }
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beds',
  templateUrl: './beds.component.html',
  styleUrls: ['./beds.component.scss']
})
export class BedsComponent implements OnInit {

  public beds: any[];
  public paramId: string;
  public areaId: string;
  constructor(public globalService: GlobalService, private route: ActivatedRoute) { 
    this.paramId = this.route.snapshot.paramMap.get('id');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
  }

  ngOnInit(): void {
    this.getBeds();
  }
  getBeds = () =>{
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getBeds(this.paramId).then(results => {
      this.globalService.setLoading(false);
      this.beds = results;
    }).catch(e => {
      this.globalService.setLoading(false);
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }
  addBed = () => {
    this.globalService.utils.openFormDialog(null, 'actions.addBed').then(result => {
      if(result){
        this.globalService.setLoading(true);
        const data =  {desc: result, id_room: parseInt(this.paramId)};
        this.globalService.hospitalService.add('/beds', data).then(result => {
          this.getBeds();
        }).catch(error => {
          console.log(error);
          this.globalService.setLoading(false);
          this.globalService.utils.openSimpleDialog('error.server-error')
        })
      }
    })
  }

}

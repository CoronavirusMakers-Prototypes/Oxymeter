import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@app/services/global/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  public rooms: any[];
  public paramId: string;
  constructor(public globalService: GlobalService, private route: ActivatedRoute) { 
    this.paramId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getRooms();
  }
  getRooms = () => {
    this.globalService.setLoading(true);
    this.globalService.hospitalService.getRooms(this.paramId).then(results => {
      this.rooms = results;
      this.globalService.setLoading(false);
    }).catch(e => {
      this.globalService.setLoading(false);
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }
  addRoom = () => {
    this.globalService.utils.openFormDialog(null, 'actions.addRoom').then(result => {
      if(result){
        this.globalService.setLoading(true);
        const data =  {desc: result, id_area: parseInt(this.paramId)};
        this.globalService.hospitalService.add('/rooms', data).then(result => {
          this.getRooms();
        }).catch(error => {
          console.log(error);
          this.globalService.setLoading(false);
          this.globalService.utils.openSimpleDialog('error.server-error')
        })
      }
    })
  }

}

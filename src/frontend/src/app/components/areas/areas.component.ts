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
    this.globalService.hospitalService.getAreas(this.paramId).then(results => {
      this.areas = results;
    }).catch(e => {
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

}

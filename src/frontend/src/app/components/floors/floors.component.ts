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
    this.globalService.hospitalService.getFloors(this.paramId).then(results => {
      this.floors = results;
    }).catch(e => {
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

}

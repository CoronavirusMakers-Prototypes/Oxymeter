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
    this.globalService.hospitalService.getBeds(this.paramId).then(results => {
      this.beds = results;
    }).catch(e => {
      this.globalService.utils.openSimpleDialog('error.server-error');
    });
  }

}

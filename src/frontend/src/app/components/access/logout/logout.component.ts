import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private globalService: GlobalService, private router: Router) {
    this.globalService.logout();
    this.router.navigate([`/hospital`]);
  }

}

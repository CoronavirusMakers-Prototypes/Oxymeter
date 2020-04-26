import { Component, OnInit } from '@angular/core';
import { GlobalService } from '@services/global/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor( public globalService: GlobalService,
               public router: Router) {
    if (!globalService.authService.getRole()){
      router.navigate([`/alarms`]);
    }
  }

  ngOnInit(): void {
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor( public authService: AuthenticationService, public router: Router, public dialog: MatDialog) {
    if (!authService.getRole()){
      router.navigate([`/home`]);
    }
  }

  ngOnInit(): void {
  }


}

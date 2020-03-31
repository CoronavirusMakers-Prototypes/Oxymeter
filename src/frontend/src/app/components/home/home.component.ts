import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '@app/class/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              private router: Router) {

  }

  ngOnInit(): void {
  }


}

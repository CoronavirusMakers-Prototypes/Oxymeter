import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Router, NavigationEnd, Params } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  localData = null;
  route = '';
  title= 'title'

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.localData = authService.getData();
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
        this.localData = authService.getData();
      }
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.setTitle, true);
  }

  ngAfterViewInit(){
    window.addEventListener('resize', this.setTitle, true);
  }

  setTitle = () => {
    if(window.innerWidth < 600){
      this.title = 'smallTitle';
    }else{
      this.title = 'title';
    }
  }

}

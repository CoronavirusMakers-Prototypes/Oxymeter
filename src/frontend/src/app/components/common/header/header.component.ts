import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Router, NavigationEnd, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  localData = null;
  route = '';
  title = 'title';
  logged: boolean;

  loggedSubscription: Subscription;
  routerEventsSubscription: Subscription;

  constructor(private authService: AuthenticationService,
              private router: Router) {
    this.localData = authService.getData();
    this.logged = authService.isAuthenticated();
    this.routerEventsSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
        this.localData = authService.getData();
      }
    });

    this.loggedSubscription = this.authService.logged$.subscribe( logged => {
      console.log("HEADER IS LOGGED: "+logged)
      this.logged = logged;
    });

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.loggedSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
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

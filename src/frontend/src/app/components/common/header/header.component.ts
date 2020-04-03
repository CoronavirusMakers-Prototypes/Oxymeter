import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@app/class/User';
import { GlobalService } from '@app/services/global/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  localData: User;
  route = '';
  title = 'title';
  logged: boolean;
  hospitalDesc: string;

  loggedSubscription: Subscription;
  routerEventsSubscription: Subscription;

  constructor(private globalService: GlobalService,
              private router: Router) {
    this.localData = globalService.authService.getData();
    this.logged = globalService.authService.isAuthenticated();
    this.routerEventsSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
        this.localData = globalService.authService.getData();
      }
    });

    this.loggedSubscription = this.globalService.authService.logged$.subscribe( logged => {
      this.logged = logged;
      this.localData = globalService.authService.getData();
      if(this.localData.getIdHospital()){
        this.globalService.hospitalService.getHospitalById(this.localData.getIdHospital()).then( res => {
          this.hospitalDesc = res.desc;
        }).catch(e => console.log(e));
      }
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

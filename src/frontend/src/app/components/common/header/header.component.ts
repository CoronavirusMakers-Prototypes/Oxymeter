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
  userText = '';
  logged: boolean;
  hospitalDesc: string;

  loggedSubscription: Subscription;
  routerEventsSubscription: Subscription;

  constructor(public globalService: GlobalService,
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
      if(this.localData.getIdHospital() && !this.hospitalDesc){
        this.globalService.hospitalService.getHospitalById(this.localData.getIdHospital()).then( res => {
          this.hospitalDesc = res.desc;
          this.setTitle();
        }).catch(e => console.log(e));
      }
    });

  }

  ngOnInit(): void {
    this.setTitle();
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
      this.userText = this.localData.getProfessionalId();
    }else{
      this.title = 'title';
      if(this.hospitalDesc){
        this.userText = this.hospitalDesc+' user: '+this.localData.getProfessionalId();
      }else{
        this.userText = 'User: '+this.localData.getProfessionalId();
      }
    }
  }

}

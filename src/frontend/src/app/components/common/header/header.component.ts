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
  clapsTime: boolean;

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
      if(this.localData && this.localData.getIdHospital() && !this.hospitalDesc){
        this.globalService.hospitalService.getHospitalById(this.localData.getIdHospital()).then( res => {
          this.hospitalDesc = res.desc;
          this.setTitle();
        }).catch(e => console.log(e));
      }
    });

  }

  ngOnInit(): void {
    this.setTitle();
    this.setClapsTime();
  }

  setClapsTime = () => {
    const time = new Date();
    const timeClapS = 71940; // 19:59
    const timeDayS = 86400; // 24:00
    const timeS = (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds());
    let delay = 0;
    if (timeS <= timeClapS){
      delay = timeClapS - timeS;
    }else{
      delay = timeDayS - timeS + timeClapS;
    }
    setTimeout(() => {
      this.showClaps(true);
      setTimeout(() => {
        this.showClaps(false);
        this.setClapsTime();
      }, 120000); // Se muestra durante 2 min hasta 20:01
    }, delay * 1000);
  }

  showClaps = (act) => {
    this.clapsTime = act;
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
    let professional_id = this.localData && this.localData.getProfessionalId() ?  this.localData.getProfessionalId() : '';
    if(window.innerWidth < 600){
      this.title = 'smallTitle';
      this.userText = professional_id;
    }else{
      this.title = 'title';
      if(this.hospitalDesc){
        this.userText = this.hospitalDesc+' user: '+professional_id;
      }else{
        this.userText = 'User: '+professional_id;
      }
    }
  }


}

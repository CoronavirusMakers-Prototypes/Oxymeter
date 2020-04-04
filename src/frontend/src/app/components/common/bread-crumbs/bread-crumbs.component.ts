import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GlobalService } from '@app/services/global/global.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit, OnDestroy {

  private buildingSubscription: Subscription;
  private floorSubscription: Subscription;
  private areaSubscription: Subscription;
  private roomSubscription: Subscription;
  private routerEventsSubscription: Subscription;

  public building: any;
  public floor: any;
  public area: any;
  public room: any;

  private actualRoute: string;


  constructor(public globalService: GlobalService, private router: Router) {
    this.buildingSubscription = this.globalService.building$.subscribe(value => {
      this.building = value;
    });
    this.floorSubscription = this.globalService.floor$.subscribe(value => {
      this.floor = value;
    });
    this.areaSubscription = this.globalService.area$.subscribe(value => {
      this.area = value;
    });
    this.roomSubscription = this.globalService.room$.subscribe(value => {
      this.room = value;
    });
    this.routerEventsSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.actualRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.actualRoute = this.router.url;
    this.building = this.globalService.localData.building;
    this.floor = this.globalService.localData.floor;
    this.area = this.globalService.localData.area;
    this.room = this.globalService.localData.room;
  }

  ngOnDestroy() {
    this.buildingSubscription.unsubscribe();
    this.floorSubscription.unsubscribe();
    this.areaSubscription.unsubscribe();
    this.roomSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }

  getClass = (crumbs) => {
    let classes = '';
    if(this.actualRoute){
      crumbs.forEach(crumb => {
        if(this.actualRoute.indexOf(crumb)>=0){
          classes = 'active';
        }
      });
    }
    let addDisable = true;
    if(crumbs.indexOf('hospital') >= 0){
      addDisable = false;
    }
    if(crumbs.indexOf('building') >= 0 && this.building){
      addDisable = false;
    }
    if(crumbs.indexOf('floor') >= 0 && this.building && this.floor){
      addDisable = false;
    }
    if(crumbs.indexOf('area') >= 0 && this.building && this.floor && this.area){
      addDisable = false;
    }
    if(addDisable){ classes += ' disabled'; }

    return classes;
  } 

  goTo = (url: string, id?) => {
    if(id){
      this.router.navigate([url , id]);
    }else{
      this.router.navigate([url]);
    }
  }

}

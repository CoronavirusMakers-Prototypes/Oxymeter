import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbNotificationsComponent } from './bread-crumb-notifications.component';

describe('BreadCrumbNotificationsComponent', () => {
  let component: BreadCrumbNotificationsComponent;
  let fixture: ComponentFixture<BreadCrumbNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumbNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedComponent } from './bed.component';

describe('BedComponent', () => {
  let component: BedComponent;
  let fixture: ComponentFixture<BedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

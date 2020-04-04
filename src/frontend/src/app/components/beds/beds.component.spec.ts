import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedsComponent } from './beds.component';

describe('BedsComponent', () => {
  let component: BedsComponent;
  let fixture: ComponentFixture<BedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

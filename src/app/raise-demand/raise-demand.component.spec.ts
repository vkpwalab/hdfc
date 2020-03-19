import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseDemandComponent } from './raise-demand.component';

describe('RaiseDemandComponent', () => {
  let component: RaiseDemandComponent;
  let fixture: ComponentFixture<RaiseDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RERADetailsComponent } from './rera-details.component';

describe('RERADetailsComponent', () => {
  let component: RERADetailsComponent;
  let fixture: ComponentFixture<RERADetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RERADetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RERADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

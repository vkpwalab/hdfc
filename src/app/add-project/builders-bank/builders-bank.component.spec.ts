import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildersBankComponent } from './builders-bank.component';

describe('BuildersBankComponent', () => {
  let component: BuildersBankComponent;
  let fixture: ComponentFixture<BuildersBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildersBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildersBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenubarComponent } from './side-menubar.component';

describe('SideMenubarComponent', () => {
  let component: SideMenubarComponent;
  let fixture: ComponentFixture<SideMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

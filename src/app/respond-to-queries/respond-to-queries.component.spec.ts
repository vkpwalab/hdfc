import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondToQueriesComponent } from './respond-to-queries.component';

describe('RespondToQueriesComponent', () => {
  let component: RespondToQueriesComponent;
  let fixture: ComponentFixture<RespondToQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondToQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondToQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

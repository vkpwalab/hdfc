import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAssistanceComponent } from './project-assistance.component';

describe('ProjectAssistanceComponent', () => {
  let component: ProjectAssistanceComponent;
  let fixture: ComponentFixture<ProjectAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

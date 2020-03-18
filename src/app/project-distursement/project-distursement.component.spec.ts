import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDistursementComponent } from './project-distursement.component';

describe('ProjectDistursementComponent', () => {
  let component: ProjectDistursementComponent;
  let fixture: ComponentFixture<ProjectDistursementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDistursementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDistursementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

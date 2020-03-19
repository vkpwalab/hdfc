import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectUpdateComponent } from './add-project-update.component';

describe('AddProjectUpdateComponent', () => {
  let component: AddProjectUpdateComponent;
  let fixture: ComponentFixture<AddProjectUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProjectUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

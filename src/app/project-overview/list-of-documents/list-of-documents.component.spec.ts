import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfDocumentsComponent } from './list-of-documents.component';

describe('ListOfDocumentsComponent', () => {
  let component: ListOfDocumentsComponent;
  let fixture: ComponentFixture<ListOfDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocxComponent } from './upload-docx.component';

describe('UploadDocxComponent', () => {
  let component: UploadDocxComponent;
  let fixture: ComponentFixture<UploadDocxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

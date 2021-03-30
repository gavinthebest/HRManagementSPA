import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUploadComponent_hr } from './details-upload.component';

describe('DetailsUploadComponent', () => {
  let component: DetailsUploadComponent_hr;
  let fixture: ComponentFixture<DetailsUploadComponent_hr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsUploadComponent_hr ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUploadComponent_hr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

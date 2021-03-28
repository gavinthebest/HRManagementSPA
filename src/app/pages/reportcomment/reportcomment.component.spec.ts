import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportcommentComponent } from './reportcomment.component';

describe('ReportcommentComponent', () => {
  let component: ReportcommentComponent;
  let fixture: ComponentFixture<ReportcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportcommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

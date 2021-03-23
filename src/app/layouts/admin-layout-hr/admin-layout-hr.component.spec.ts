import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutHrComponent } from './admin-layout-hr.component';

describe('AdminLayoutHrComponent', () => {
  let component: AdminLayoutHrComponent;
  let fixture: ComponentFixture<AdminLayoutHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLayoutHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

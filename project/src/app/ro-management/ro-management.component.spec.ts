import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoManagementComponent } from './ro-management.component';

describe('RoManagementComponent', () => {
  let component: RoManagementComponent;
  let fixture: ComponentFixture<RoManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

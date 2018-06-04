import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRoComponent } from './add-new-ro.component';

describe('AddNewRoComponent', () => {
  let component: AddNewRoComponent;
  let fixture: ComponentFixture<AddNewRoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

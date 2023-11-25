import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyHeaderComponent } from './property-header.component';

describe('PropertyHeaderComponent', () => {
  let component: PropertyHeaderComponent;
  let fixture: ComponentFixture<PropertyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoctaionPropertyComponent } from './loctaion-property.component';

describe('LoctaionPropertyComponent', () => {
  let component: LoctaionPropertyComponent;
  let fixture: ComponentFixture<LoctaionPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoctaionPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoctaionPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

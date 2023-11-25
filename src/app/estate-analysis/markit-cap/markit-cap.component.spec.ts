import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkitCapComponent } from './markit-cap.component';

describe('MarkitCapComponent', () => {
  let component: MarkitCapComponent;
  let fixture: ComponentFixture<MarkitCapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkitCapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkitCapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

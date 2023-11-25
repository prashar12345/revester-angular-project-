import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialARVComponent } from './potential-arv.component';

describe('PotentialARVComponent', () => {
  let component: PotentialARVComponent;
  let fixture: ComponentFixture<PotentialARVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialARVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialARVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

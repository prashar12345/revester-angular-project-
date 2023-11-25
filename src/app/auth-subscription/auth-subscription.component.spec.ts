import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSubscriptionComponent } from './auth-subscription.component';

describe('AuthSubscriptionComponent', () => {
  let component: AuthSubscriptionComponent;
  let fixture: ComponentFixture<AuthSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSubscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCrawlComponent } from './property-crawl.component';

describe('PropertyCrawlComponent', () => {
  let component: PropertyCrawlComponent;
  let fixture: ComponentFixture<PropertyCrawlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCrawlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCrawlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

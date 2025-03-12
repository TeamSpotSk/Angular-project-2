import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayListingComponent } from './gateway-listing.component';

describe('GatewayListingComponent', () => {
  let component: GatewayListingComponent;
  let fixture: ComponentFixture<GatewayListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatewayListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GatewayListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

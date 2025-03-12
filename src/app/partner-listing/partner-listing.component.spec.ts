import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListingComponent } from './partner-listing.component';

describe('PartnerListingComponent', () => {
  let component: PartnerListingComponent;
  let fixture: ComponentFixture<PartnerListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnerListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

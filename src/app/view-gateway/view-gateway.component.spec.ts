import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGatewayComponent } from './view-gateway.component';

describe('ViewGatewayComponent', () => {
  let component: ViewGatewayComponent;
  let fixture: ComponentFixture<ViewGatewayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGatewayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

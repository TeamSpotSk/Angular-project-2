import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-gateway',
  standalone: true,
  templateUrl: './view-gateway.component.html',
  styleUrls: ['./view-gateway.component.css']
})
export class ViewGatewayComponent {
  gateway: any = {};

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['viewGateway']) { // Access using []
      this.gateway = navigation.extras.state['viewGateway']; // Corrected here
    }
  }

  navigateHome() {
    this.router.navigate(['/gateway-listing']);
  }
}

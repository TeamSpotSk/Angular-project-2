import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-gateway',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit-gateway.component.html',
  styleUrls: ['./edit-gateway.component.css'],
})
export class EditGatewayComponent {
  gatewayId!: number;
  gatewayType: string = '';
  description: string = '';
  isActive: boolean = true;
  gateways: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['editGateway']) {
      const selectedGateway = navigation.extras.state['editGateway'];
      this.gateways = navigation.extras.state['gateways'] || [];
      this.gatewayId = selectedGateway.id;
      this.gatewayType = selectedGateway.name;
      this.description = selectedGateway.description;
      this.isActive = selectedGateway.status === 'ACTIVE';
    }
  }
  
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.gatewayId = id;
        this.loadGateway();
      }
    });
  }

  loadGateway() {
    const gateway = this.gateways.find((g: any) => g.id === this.gatewayId);
    if (gateway) {
      this.gatewayType = gateway.name;
      this.description = gateway.description;
      this.isActive = gateway.status === 'ACTIVE';
    }
  }

  updateGateway() {
    const updatedGateway = {
      id: this.gatewayId,
      name: this.gatewayType,
      description: this.description,
      status: this.isActive ? 'ACTIVE' : 'INACTIVE',
    };

    console.log('Updated Gateway:', updatedGateway);
    this.router.navigate(['/gateway-listing'], { state: { updatedGateway } });
  }

  cancelEdit() {
    this.router.navigate(['/gateway-listing']);
  }
}

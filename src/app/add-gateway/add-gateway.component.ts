import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-gateway',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-gateway.component.html',
})
export class AddGatewayComponent {
  gateway = { id: 0, gatewayType: '', description: '', active: false };
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state?.['editGateway']) {
      this.gateway = { ...navigation.extras.state['editGateway'] }; // Clone object
      this.isEdit = true;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id && this.isEdit) {
        this.gateway.id = id;
      }
    });
  }

  onSubmit(gatewayForm: NgForm) {
    if (gatewayForm.invalid) {
      gatewayForm.form.markAllAsTouched();
      return;
    }

    let navigationExtras: NavigationExtras;
    if (this.isEdit) {
      navigationExtras = { state: { updatedGateway: { ...this.gateway } } };
    } else {
      this.gateway.id = Date.now(); // Unique ID for new entry
      navigationExtras = { state: { newGateway: { ...this.gateway } } };
    }

    console.log('Saved Data:', this.gateway);
    this.router.navigate(['/gateway-listing'], navigationExtras);
  }

  goHome() {
    this.router.navigate(['/gateway-listing']);
  }
}

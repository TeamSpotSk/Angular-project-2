import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-add-partner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css']
})
export class AddPartnerComponent {
  partnerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private partnerService: PartnerService
  ) {
    this.partnerForm = this.fb.group({
      partnerName: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.partnerForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit() {
    this.partnerForm.markAllAsTouched(); // This will trigger all validations
    if (this.partnerForm.valid) {
      const partnerData = {
        partnerName: this.partnerForm.get('partnerName')?.value,
        contactPerson: this.partnerForm.get('contactPerson')?.value,
        contactNumber: this.partnerForm.get('contactNumber')?.value,
        email: this.partnerForm.get('email')?.value,
        address: this.partnerForm.get('address')?.value,
        country: this.partnerForm.get('country')?.value,
        state: this.partnerForm.get('state')?.value,
        city: this.partnerForm.get('city')?.value,
        zipCode: this.partnerForm.get('zipCode')?.value,
        status: 'ACTIVE'
      };

      console.log('Saving Partner:', partnerData);
      this.partnerService.addPartner(partnerData); // Use service method
      this.router.navigate(['/partner-listing']);
    }
  }

  onCancel() {
    this.router.navigate(['/partner-listing']);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PartnerService } from '../services/partner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-partner',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.css']
})
export class EditPartnerComponent implements OnInit {
  partner: any = {};
  partnerId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.partnerId = Number(params.get('id'));
      if (!isNaN(this.partnerId)) {
        const foundPartner = this.partnerService.getPartnerById(this.partnerId);
        if (foundPartner) {
          this.partner = { ...foundPartner };
          
          // Map Backend Fields to UI Fields
          this.partner.name = this.partner.partnerName; // Backend 'partnerName' → UI 'name'
          this.partner.address = `${this.partner.address1} ${this.partner.address2}`.trim(); // Combine Address Fields
        }
      }
    });
  }
  
  onSubmit() {
    console.log("Updating Partner:", this.partner);
  
    // Map UI Fields to Backend Fields
    this.partner.partnerName = this.partner.name; // UI 'name' → Backend 'partnerName'
    
    // Split Address into Address 1 and Address 2
    const addressParts = this.partner.address.split(' ', 2);
    this.partner.address1 = addressParts[0] || '';
    this.partner.address2 = addressParts[1] || '';
  
    this.partnerService.updatePartner(this.partner);
    this.router.navigate(['/partner-listing']);
  }
  
  /** Cancel Button */
  onCancel() {
    this.router.navigate(['/partner-listing']);
  }
}

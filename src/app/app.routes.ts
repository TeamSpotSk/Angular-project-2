import { Routes } from '@angular/router';
import { PartnerDashboardComponent } from './partner-dashboard/partner-dashboard.component';
import { PartnerListingComponent } from './partner-listing/partner-listing.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';
import { EditPartnerComponent } from './edit-partner/edit-partner.component';

export const routes: Routes = [
  { path: '', component: PartnerDashboardComponent }, // Default page
  { path: 'partners-dashboard', component: PartnerDashboardComponent }, // ✅ Corrected syntax
  { path: 'partner-listing', component: PartnerListingComponent },
  { path: 'add-partner', component: AddPartnerComponent },
  { path: 'edit-partner/:id', component: EditPartnerComponent },
];

<<<<<<< HEAD
import { Routes, provideRouter } from '@angular/router';
import { GatewayListingComponent } from './gateway-listing/gateway-listing.component';
import { AddGatewayComponent } from './add-gateway/add-gateway.component';
import { EditGatewayComponent } from './edit-gateway/edit-gateway.component';
import { ViewGatewayComponent } from './view-gateway/view-gateway.component';

export const routes: Routes = [
  { path: '', component: GatewayListingComponent }, // Default page
  { path: 'gateway-listing', component: GatewayListingComponent }, // Home page with URL
  { path: 'add-gateway', component: AddGatewayComponent }, // Navigates to Add Gateway page
  { path: 'edit-gateway/:id', component: EditGatewayComponent }, // Navigates to Edit page
  { path: 'view-gateway/:id', component: ViewGatewayComponent }, // Navigates to View page
  { path: '**', redirectTo: 'gateway-listing' }, // Redirect unknown paths to gateway-listing
];

export const appRouter = provideRouter(routes);
=======
import { Routes } from '@angular/router';

export const routes: Routes = [];
>>>>>>> cb11859 (initial commit)

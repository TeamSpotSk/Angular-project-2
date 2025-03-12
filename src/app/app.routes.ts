
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Default route
  { path: 'add', component: AddComponent },
  { path: 'edit', component: EditComponent },
  { path: 'home', component: HomeComponent }  // Explicitly define /home route
];
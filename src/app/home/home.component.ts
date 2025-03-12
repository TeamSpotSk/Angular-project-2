import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeComponent {
  displayedColumns: string[] = ['select', 'name', 'description', 'edgeDevice', 'product', 'active'];
  devices: any[] = [];
  filteredDevices: any[] = []; // Stores filtered devices
  searchTerm: string = ''; // Search term for filtering


  constructor(private router: Router, private apiService: ApiService) {}
  sortDirection: string = '';

  sortByName() {
    if (this.sortDirection === '' || this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
      this.filteredDevices.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      this.sortDirection = 'desc';
      this.filteredDevices.sort((a, b) => b.name.localeCompare(a.name));
    }
  }
  

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices() {
    this.devices = this.apiService.getDevices().map(device => ({
      id: device.id, // Ensure ID is included
      name: device.deviceType,
      edgeDevice: device.edgeController,
      description: device.description,
      product: device.productName,
      active: device.active,
      parameters: device.parameters
    }));
    this.filteredDevices = [...this.devices]; // Initialize with all devices
  }
  filterDevices() {
    if (this.searchTerm.length < 3) {
      this.filteredDevices = [...this.devices]; // Show all if less than 3 characters
    } else {
      this.filteredDevices = this.devices.filter(device =>
        device.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  navigateToAddPage() {
    this.router.navigate(['/add']);
  }

  navigateToEditPage(device: any) {
    console.log("navigateToEditPage: Received device object:", device);
  
    if (!device || !device.id) {
      alert("Error: No device selected!");
      console.error("navigateToEditPage: No device object or missing ID:", device);
      return;
    }
  
    // Fetch the full device object
    const fullDevice = this.apiService.getDevices().find(d => d.id === device.id);
  
    if (!fullDevice) {
      alert("Error: Device not found in storage!");
      console.error("navigateToEditPage: Device not found in localStorage:", device.id);
      return;
    }
  
    console.log("navigateToEditPage: Storing device in localStorage:", fullDevice);
    this.apiService.setSelectedDevice(fullDevice); // Store full device object
    console.log("navigateToEditPage: Device stored. Navigating to /edit");
  
    this.router.navigate(['/edit']);
  }
  

  deleteDevice(device: any) {
    if (confirm('Are you sure you want to delete this device?')) {
      this.apiService.deleteDevice(device.id);
      this.loadDevices();
    }
  }
}

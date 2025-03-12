import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  isActive = true;
  device: any = {
    id: null, // Ensure the ID is properly assigned
    deviceType: '',
    edgeController: '',
    description: '',
    productName: ''
  };
  parameters: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    console.log("EditComponent: Fetching selected device from localStorage...");
  
    setTimeout(() => { // Ensure localStorage update before retrieving
      const selectedDevice = this.apiService.getSelectedDevice();
      console.log("EditComponent: Retrieved device from localStorage:", selectedDevice);
  
      if (selectedDevice && selectedDevice.id !== undefined) {
        this.device = { ...selectedDevice };
        this.parameters = selectedDevice.parameters
          ? selectedDevice.parameters.map((param: any, index: number) => ({
              id: index + 1,
              name: param.name || '',
              shortname: param.shortname || '',
              uom: param.uom || '',
              register: param.register || 'NIL',
              datatype: param.datatype || '',
              isEditing: false
            }))
          : [];
        this.isActive = selectedDevice.active ?? true;
      } else {
        alert("Error: No device selected for editing!");
        console.error("EditComponent: No device found in localStorage!");
        this.router.navigate(['/home']);
      }
    }, 200); // Small delay ensures storage is updated before reading
  }
  

  addParameter() {
    this.parameters.push({
      id: this.parameters.length + 1,
      shortname: 'kwh',
      uom: 'kwh',
      register: 'NIL',
      datatype: 'float',
      isEditing: true
    });
  }

  editParameter(param: any) {
    param.isEditing = true;
  }

  saveParameter(param: any) {
    param.isEditing = false;
  }

  deleteParameter(index: number) {
    this.parameters.splice(index, 1);
    this.parameters.forEach((param, i) => (param.id = i + 1));
  }

  updateDevice() {
    if (!this.device.id) {
      alert("Error: Device ID missing! Cannot update.");
      return;
    }
  
    const updatedDevice = {
      ...this.device,
      parameters: [...this.parameters], // Ensure deep copy of parameters
      active: this.isActive
    };
  
    this.apiService.updateDevice(updatedDevice);
    alert("Device updated successfully!");
  
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); // Force Home Page refresh to show changes
    });
  }
  
  cancel() {
    this.router.navigate(['/home']);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  parameters: any[] = [];
  device: any = {
    deviceType: '',
    edgeController: '',
    description: '',
    productName: '',
    active: false
  };

  touchedFields: any = {
    deviceType: false,
    edgeController: false,
    description: false,
    productName: false
  };

  constructor(private router: Router, private apiService: ApiService) {}

  markAsTouched(field: string) {
    this.touchedFields[field] = true;
  }

  addParameter() {
    this.parameters.push({
      parameterName: '',
      register: '',
      dataType: '',
      isAdded: true,
      touched: false
    });
  }

  markParameterAsSaved(index: number) {
    if (this.isValidRow(index)) {
      alert('Data Saved Successfully!');
      this.parameters[index].isAdded = false; // Optional: mark it as saved
    } else {
      this.markParameterAsTouched(index);
      alert('Please fill all required fields!');
    }
  }
  

  isValidRow(index: number): boolean {
    return this.parameters[index].parameterName && this.parameters[index].register && this.parameters[index].dataType;
  }

  markParameterAsTouched(index: number) {
    this.parameters[index].touched = true;
  }

  deleteParameter(index: number) {
    this.parameters.splice(index, 1);
  }

  saveDevice() {
    Object.keys(this.touchedFields).forEach((key) => (this.touchedFields[key] = true));
    this.parameters.forEach((param) => (param.touched = true));

    if (!this.device.deviceType || !this.device.edgeController || !this.device.description || !this.device.productName) {
      return;
    }

    const newDevice = {
      ...this.device,
      parameters: [...this.parameters]
    };

    this.apiService.addDevice(newDevice);
    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}

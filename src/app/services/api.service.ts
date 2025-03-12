// api.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  storageKey = 'devices';
  selectedDeviceKey = 'selectedDevice';

  constructor() {}

  getDevices(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addDevice(device: any) {
    const devices = this.getDevices();
    device.id = new Date().getTime(); // Assign Unique ID
    devices.push(device);
    localStorage.setItem(this.storageKey, JSON.stringify(devices));
  }

  updateDevice(updatedDevice: any) {
    let devices = this.getDevices();
    const index = devices.findIndex(device => device.id === updatedDevice.id);

    if (index !== -1) {
      devices[index] = updatedDevice;
      localStorage.setItem(this.storageKey, JSON.stringify(devices));
    }
  }

  deleteDevice(deviceId: number) {
    let devices = this.getDevices();
    devices = devices.filter(device => device.id !== deviceId);
    localStorage.setItem(this.storageKey, JSON.stringify(devices));
  }

  setSelectedDevice(device: any) {
    if (device && device.id !== undefined) {
      localStorage.setItem(this.selectedDeviceKey, JSON.stringify(device));
    }
  }

  getSelectedDevice() {
    const device = localStorage.getItem(this.selectedDeviceKey);
    return device ? JSON.parse(device) : null;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GatewayService {
  private storageKey = 'gateways';

  constructor() {}

  getGateways(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveGateways(gateways: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(gateways));
  }

  addGateway(gateway: any): void {
    const gateways = this.getGateways();
    gateway.id = Date.now(); // Unique ID
    gateways.push(gateway);
    this.saveGateways(gateways);
  }

  updateGateway(updatedGateway: any): void {
    let gateways = this.getGateways();
    const index = gateways.findIndex(g => g.id === updatedGateway.id);
    if (index !== -1) {
      gateways[index] = updatedGateway;
      this.saveGateways(gateways);
    }
  }

  deleteGateway(id: number): void {
    let gateways = this.getGateways().filter(g => g.id !== id);
    this.saveGateways(gateways);
  }

  getGatewayById(id: number): any {
    return this.getGateways().find(g => g.id === id);
  }
}

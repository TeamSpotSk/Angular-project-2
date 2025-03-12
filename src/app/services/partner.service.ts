import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private storageKey = 'partners';
  private partnersSubject = new BehaviorSubject<any[]>(this.getPartners());
  partners$ = this.partnersSubject.asObservable(); // Observable to listen for changes

  constructor() {
    // Initialize local storage if empty
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  // Get all partners from local storage
  getPartners(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Get partner by ID
  getPartnerById(id: number): any {
    const partners = this.getPartners();
    return partners.find(p => p.id === id);
  }

  // Add a new partner
  addPartner(partner: any): void {
    const partners = this.getPartners();
    partner.id = partners.length ? partners[partners.length - 1].id + 1 : 1; // Auto-increment ID
    partners.push(partner);
    localStorage.setItem(this.storageKey, JSON.stringify(partners));
    this.partnersSubject.next(partners); // Notify subscribers
  }

  // Update an existing partner
  updatePartner(updatedPartner: any): void {
    let partners = this.getPartners();
    partners = partners.map(p => (p.id === updatedPartner.id ? updatedPartner : p));
    localStorage.setItem(this.storageKey, JSON.stringify(partners));
    this.partnersSubject.next(partners); // Notify subscribers
  }

  // Delete a partner by ID
  deletePartner(id: number): void {
    let partners = this.getPartners();
    partners = partners.filter(p => p.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(partners));
    this.partnersSubject.next(partners); // Notify subscribers
  }
}

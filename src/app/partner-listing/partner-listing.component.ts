import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-partner-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './partner-listing.component.html',
  styleUrls: ['./partner-listing.component.css']
})
export class PartnerListingComponent implements OnInit {
  itemsPerPage = 10;
  currentPage = 1;
  partners: any[] = [];
  filteredPartners: any[] = [];
  searchText: string = '';
  sortAscending: boolean = true; // Sorting flag for Name column

  constructor(private router: Router, private partnerService: PartnerService) {}

  ngOnInit() {
    // Subscribe to the Partner Service Observable
    this.partnerService.partners$.subscribe((partners) => {
      this.partners = partners;
      this.filteredPartners = [...partners];
      this.filterData(); // Initial Filter
    });
  }

  /** Navigate to Add Partner Page */
  navigateToAddPartner() {
    this.router.navigate(['/add-partner']);
  }

  /** Navigate to Edit Partner */
  navigateToEdit(partnerId: number) {
    this.router.navigate(['/edit-partner', partnerId]);
  }

  /** Delete Partner */
  deletePartner(partnerId: number) {
    this.partnerService.deletePartner(partnerId); // Use Service Method
    this.filterData(); // Refresh filtered data after deletion
  }

  /** Pagination */
  getPaginatedPartners(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPartners.slice(start, start + this.itemsPerPage);
  }

  get totalDisplayedItems(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredPartners.length);
  }

  updatePagination() {
    this.currentPage = 1;
  }

  goToFirstPage() {
    this.currentPage = 1;
  }

  goToPreviousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToNextPage() {
    if (this.currentPage * this.itemsPerPage < this.filteredPartners.length) this.currentPage++;
  }

  goToLastPage() {
    this.currentPage = Math.ceil(this.filteredPartners.length / this.itemsPerPage);
  }

  /** Sort Data by Name */
  sortByName() {
    this.sortAscending = !this.sortAscending; // Toggle sorting direction
    this.filteredPartners.sort((a, b) => {
      const nameA = a.partnerName.toLowerCase();
      const nameB = b.partnerName.toLowerCase();
      return this.sortAscending ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
  }

  /** Filter Data Based on Search Input */
  filterData() {
    if (this.searchText.trim().length >= 3) {
      this.filteredPartners = this.partners.filter((partner) =>
        partner.partnerName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredPartners = [...this.partners];
    }
    this.sortByName(); // Ensure sorting is applied after filtering
    this.updatePagination();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, NavigationExtras } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete.confirmation/delete.confirmation.component';

@Component({
  selector: 'app-gateway-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './gateway-listing.component.html',
  styleUrl: './gateway-listing.component.css',
})
export class GatewayListingComponent {
  gateways: any[] = [];
  selectedGatewayId: number | null = null;
  searchQuery: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  displayedGateways: any[] = [];
  isAscending: boolean = true; // Track sorting order

  constructor(private router: Router, private dialog: MatDialog) {
    this.loadGateways(); // Load existing gateways
    this.handleNavigationState();
  }

  /** Load gateways from local storage */
  loadGateways() {
    const storedGateways = localStorage.getItem('gateways');
    this.gateways = storedGateways ? JSON.parse(storedGateways) : [];
    this.updatePagination();
  }

  /** Save updated gateways to local storage */
  saveGateways() {
    localStorage.setItem('gateways', JSON.stringify(this.gateways));
    this.updatePagination();
  }

  /** Handle new and edited gateway data passed via navigation state */
  handleNavigationState() {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation?.extras?.state) return;

    const { newGateway, updatedGateway } = navigation.extras.state;

    if (newGateway) {
      console.log('New Gateway:', newGateway);
      this.gateways.push({
        id: Date.now(),
        name: newGateway.gatewayType,
        description: newGateway.description,
        status: newGateway.active ? 'ACTIVE' : 'INACTIVE',
      });
      this.saveGateways();
    }

    if (updatedGateway) {
      console.log('Updated Gateway Received:', updatedGateway);
      const index = this.gateways.findIndex(g => g.id === updatedGateway.id);
      if (index !== -1) {
        this.gateways[index] = updatedGateway;
        this.saveGateways();
      }
    }
  }

  /** Select a gateway by ID */
  selectGateway(id: number) {
    this.selectedGatewayId = id;
  }

  /** Deselect a gateway */
  cancelSelection() {
    this.selectedGatewayId = null;
  }

  /** Navigate to Add Gateway page */
  navigateToAddGateway() {
    this.router.navigate(['/add-gateway']);
  }

  /** Navigate to Edit Gateway page with selected gateway data */
  navigateToEdit() {
    if (!this.selectedGatewayId) return;
  
    const selectedGateway = this.gateways.find(g => g.id === this.selectedGatewayId);
    if (selectedGateway) {
      this.router.navigate([`/edit-gateway/${this.selectedGatewayId}`], {
        state: { editGateway: selectedGateway, gateways: this.gateways }, // Pass both selected gateway and gateways array
      });
    }
  }
  
/** Navigate to View Gateway page */
navigateToView() {
  if (this.selectedGatewayId !== null) {
    const selectedGateway = this.gateways.find(g => g.id === this.selectedGatewayId);
    if (selectedGateway) {
      this.router.navigate([`/view-gateway/${this.selectedGatewayId}`], {
        state: { viewGateway: selectedGateway }, // Passing selected data via state
      });
    }
  }
}


  /** Open confirmation dialog before deleting a gateway */
  confirmDelete() {
    const selectedGateway = this.gateways.find(g => g.id === this.selectedGatewayId);
    if (!selectedGateway) return;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { itemName: selectedGateway.name },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.gateways = this.gateways.filter(g => g.id !== this.selectedGatewayId);
        this.selectedGatewayId = null;
        this.saveGateways();
      }
    });
  }

  /** Sort gateways alphabetically by name */
  sortByGatewayType() {
    this.isAscending = !this.isAscending;
    this.gateways.sort((a, b) => 
      this.isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    this.updatePagination();
  }

  /** Filter and paginate displayed gateways */
  updatePagination() {
    const filtered = this.gateways.filter(g =>
      g.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedGateways = filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /** Get the total number of displayed items */
  get totalDisplayedItems(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.gateways.length);
  }

  /** Pagination controls */
  goToFirstPage() { this.currentPage = 1; this.updatePagination(); }
  goToPreviousPage() { if (this.currentPage > 1) { this.currentPage--; this.updatePagination(); } }
  goToNextPage() { if (this.currentPage * this.itemsPerPage < this.gateways.length) { this.currentPage++; this.updatePagination(); } }
  goToLastPage() { this.currentPage = Math.ceil(this.gateways.length / this.itemsPerPage); this.updatePagination(); }
}

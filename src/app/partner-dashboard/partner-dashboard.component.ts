import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-partner-dashboard',
  templateUrl: './partner-dashboard.component.html',
  styleUrls: ['./partner-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Import RouterModule
})
export class PartnerDashboardComponent {
  showAccountMenu = false;
  showAppsMenu = false;

  /** Toggle Fullscreen Mode */
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /** Open Help Dialog */
  openHelpDialog() {
    alert("Help section coming soon!"); // Replace with MatDialog for a proper modal
  }

  /** Toggle Account Menu */
  toggleAccountMenu() {
    this.showAccountMenu = !this.showAccountMenu;
    this.showAppsMenu = false; // Close apps menu if open
  }

  /** Toggle Apps Menu */
  toggleAppsMenu() {
    this.showAppsMenu = !this.showAppsMenu;
    this.showAccountMenu = false; // Close account menu if open
  }

}

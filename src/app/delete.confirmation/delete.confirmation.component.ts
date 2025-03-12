import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 bg-white rounded-lg shadow-lg w-[400px]">
      <div class="flex items-center space-x-2">
        <span class="text-red-500 text-2xl">⚠️</span>
        <h2 class="text-lg font-semibold">Delete</h2>
      </div>
      <p class="text-gray-600 mt-2">Are you sure to delete - {{ data.itemName }}?</p>
      <div class="flex justify-end space-x-2 mt-4">
        <button (click)="onCancel()" class="px-4 py-2 border rounded-lg">Cancel</button>
        <button (click)="onDelete()" class="px-4 py-2 bg-red-500 text-white rounded-lg">Delete</button>
      </div>
    </div>
  `,
})
export class DeleteConfirmationComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { itemName: string }
  ) {}

  onCancel() {
    this.dialogRef.close(false);
  }

  onDelete() {
    this.dialogRef.close(true);
  }
}

import { Component, Input } from '@angular/core';
import { InventoryItemDTO } from "../models/inventoryItemDTO";
import { DatabaseService } from "../services/database.service";
import { AlertService } from "../services/alert.service";

@Component({
  selector: 'gallery-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() image!: InventoryItemDTO;
  shouldShow = false;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService
  ) {}

  onMouseEnter(): void {
    this.shouldShow = true;
  }

  onMouseLeave(): void {
    this.shouldShow = false;
  }

  deleteImage(): void {
    this.alertService.confirmAlert("Are you sure you want to delete this image?").subscribe((confirmed: boolean) => {
      if (confirmed) {
        if (this.image.name == undefined) {
          this.databaseService.deleteGalleryItem(this.image.id!).subscribe(res => {
              this.alertService.showAlertWithRefresh(`Gallery item: ${res.image} successfully deleted`)
            },
            error => {
              this.alertService.showAlert(error.statusText);
            })
        } else {
          this.databaseService.deleteInventoryItem(this.image.id!).subscribe(res => {
              this.alertService.showAlertWithRefresh(`Inventory item: ${res.name} successfully deleted`)
            },
            error => {
              this.alertService.showAlert(error.statusText);
            })
        }
      }
    });
  }
}

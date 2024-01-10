import { Component, Input, OnInit } from '@angular/core';
import { InventoryItemDTO } from "../models/inventoryItemDTO";
import { DatabaseService } from "../services/database.service";
import { AlertService } from "../services/alert.service";
import { AuthenticationService } from "../services/authentication.service";

@Component({
  selector: 'gallery-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() image!: InventoryItemDTO;
  shouldShow = false;
  isAuthenticatedUserAdmin = false;

  constructor(private databaseService: DatabaseService,
              private authService: AuthenticationService,
              private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
  }

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
          this.databaseService.deleteGalleryItem(this.image.id!).subscribe({
            next: res => {
              this.alertService.showAlertWithRefresh(`Gallery item: ${res.image} successfully deleted`)
            },
            error: err => {
              this.alertService.showAlert(err.statusText);
            }})
        } else {
          this.databaseService.deleteInventoryItem(this.image.id!).subscribe({
            next: res => {
              this.alertService.showAlertWithRefresh(`Inventory item: ${res.name} successfully deleted`)
            },
            error: err => {
              this.alertService.showAlert(err.statusText);
            }});
        }
      }
    });
  }
}

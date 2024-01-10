import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { GalleryItemDTO } from "../../models/galleryItemDTO";
import { InventoryItemDTO } from "../../models/inventoryItemDTO";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "../../services/authentication.service";


@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit{
  images: InventoryItemDTO[] = [];
  isAuthenticatedUserAdmin = false;

  constructor(private databaseService: DatabaseService,
              private authService: AuthenticationService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
    this.databaseService.getAllGalleryItems().subscribe({
    next: res => {
      this.mapImages(res);
    },
    error: () => {
      this.alertService.showAlert("Unable to load images");
    }})
  }

  mapImages(galleryImages: GalleryItemDTO[]): void {
    this.images = galleryImages.map(image => {
      return new InventoryItemDTO(image.id, undefined, image.image, image.created_at)
    })
  }
}

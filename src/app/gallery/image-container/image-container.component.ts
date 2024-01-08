import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { GalleryItemDTO } from "../../models/galleryItemDTO";
import { InventoryItemDTO } from "../../models/inventoryItemDTO";


@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit{
  // images$ = this.storageService.allItems
  //   .pipe(
  //     map((images) => {
  //       console.log(4)
  //       return images;
  //     })
  //   );

  images: InventoryItemDTO[] = [];
  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.getAllGalleryItems().subscribe(res => {
      this.mapImages(res);
    })
  }

  mapImages(galleryImages: GalleryItemDTO[]): void {
    this.images = galleryImages.map(image => {
      return new InventoryItemDTO(image.id, undefined, image.image, image.created_at)
    })
  }
}

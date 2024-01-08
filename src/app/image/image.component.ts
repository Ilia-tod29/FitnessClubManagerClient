import { Component, Input, OnInit } from '@angular/core';
import { GalleryItemDTO } from "../models/galleryItemDTO";
import { Router } from "@angular/router";

@Component({
  selector: 'gallery-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() image!: GalleryItemDTO;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.image)
  }

  public openImage(): void {
    this.router.navigate([`/gallery/${this.image.id}`]);
  }
}

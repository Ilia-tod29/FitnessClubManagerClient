import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageContainerComponent } from './image-container/image-container.component';
import { RouterModule, Routes } from '@angular/router';
import { ImageModule } from "../image/image.module";
import { UploaderModule } from "../uploader/uploader.module";

const routes: Routes = [
  {
    path: '',
    component: ImageContainerComponent
  }
]

@NgModule({
  declarations: [
    ImageContainerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageModule,
    UploaderModule,
  ]
})
export class GalleryModule { }

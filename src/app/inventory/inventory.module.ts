import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { ImageModule } from "../image/image.module";
import { UploaderModule } from "../uploader/uploader.module";

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent
  }
]


@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ImageModule,
    UploaderModule,
  ]
})
export class InventoryModule { }

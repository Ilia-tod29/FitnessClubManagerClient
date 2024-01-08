import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent} from "./image.component";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    ImageComponent
  ],
  exports: [
    ImageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class ImageModule { }

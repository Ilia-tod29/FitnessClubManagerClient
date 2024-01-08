import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from "./uploader.component";
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [
    UploaderComponent
  ],
  exports: [
    UploaderComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule,
  ]
})
export class UploaderModule { }

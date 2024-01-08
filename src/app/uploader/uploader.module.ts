import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploaderComponent } from "./uploader.component";
import { NgxDropzoneModule } from "ngx-dropzone";
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    MatSnackBarModule
  ]
})
export class UploaderModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymDescriptionComponent } from './gym-description/gym-description.component';
import { AppModule } from '../app.module';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    GymDescriptionComponent
  ],
  imports: [
    CommonModule,
    AppModule,
    MatIconModule,
  ],
  exports: [
    GymDescriptionComponent
  ]
})
export class HomePageModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GymDescriptionComponent } from './gym-description/gym-description.component';
import { MatIconModule } from "@angular/material/icon";

const routes: Routes = [
  {
    path: '',
    component: GymDescriptionComponent
  }
]

@NgModule({
  declarations: [
    GymDescriptionComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
})
export class HomePageModule { }

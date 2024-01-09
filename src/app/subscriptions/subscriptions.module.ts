import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubsctiptionsWrapperComponent } from './subsctiptions-wrapper/subsctiptions-wrapper.component';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SubsctiptionsWrapperComponent
  }
]

@NgModule({
  declarations: [
    SubscriptionComponent,
    SubsctiptionsWrapperComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
  ]
})
export class SubscriptionsModule { }

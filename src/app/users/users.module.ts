import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent
  }
]

@NgModule({
  declarations: [
    UserComponent,
    UserWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
  ]
})
export class UsersModule { }

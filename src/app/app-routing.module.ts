import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymDescriptionComponent} from "./home-page/gym-description/gym-description.component";

const routes: Routes = [
  {
    path: '',
    component: GymDescriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

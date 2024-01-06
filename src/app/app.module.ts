import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { NgIconsModule } from '@ng-icons/core';
// import { bootstrapSunFill, bootstrapSun } from "@ng-icons/bootstrap-icons"

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    // NgIconsModule.withIcons({ bootstrapSunFill, bootstrapSun })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitnessClubManagerClient';
  isDarkTheme: boolean;
  isAuthenticated = false;
  isAuthenticatedUserAdmin = false;
  currentUser = "";

  constructor(private router: Router,
              private authService: AuthenticationService) {
    this.isAuthenticated = this.authService.isAuthenticated()
    if (this.isAuthenticated) {
      this.currentUser = this.authService.getPayload().email;
      this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
    }
    window.addEventListener('storage', () => {
      this.isAuthenticated = this.authService.isAuthenticated()
      if (this.isAuthenticated) {
        this.currentUser = this.authService.getPayload().email;
      }
    });
    const theme = localStorage.getItem('theme');
    if(theme){
      this.isDarkTheme = theme == 'dark';
    }
    else {
      this.isDarkTheme = false;
    }
  }

  toddleTheme() {
    if (!this.isDarkTheme) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
  }

  signOut() {
    localStorage.clear();
    window.location.reload();
  }

}

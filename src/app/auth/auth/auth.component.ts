import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild('errorSignIn') errorSignInEl: ElementRef | undefined;
  @ViewChild('errorSignUp') errorSignUpEl: ElementRef | undefined;
  isRegistered: boolean = false;
  isLoading: boolean = false;
  signUpObj = {
    email: "",
    password: "",
    repeatPassword: ""
  }
  signInObj = {
    email: "",
    password: ""
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  toggleRegister(): void {
    this.isRegistered = !this.isRegistered;
  }

  submitSignUp(): void {
    if (!AuthComponent.isValidEmail(this.signUpObj.email)) {
      this.errorSignUpEl!.nativeElement.textContent = "Invalid email";
      return;
    }

    if (this.signUpObj.password !== this.signUpObj.repeatPassword) {
      this.errorSignUpEl!.nativeElement.textContent = "Passwords do not match";
      return;
    }

    if (this.signUpObj.password.length < 8 || !AuthComponent.hasCapitalLetter(this.signUpObj.password)) {
      this.errorSignUpEl!.nativeElement.textContent = "Password must have at least 8 symbols and a capital letter";
      return;
    }

    this.authenticationService.signUp({
      email: this.signUpObj.email,
      password: this.signUpObj.password
    }).subscribe({
      next: (response: any) => {
        this.authenticationService.validate(response);
        window.location.reload();
        this.router.navigate(['home'])
      },
      error: err => {
        this.isLoading = false;
        if (err.status == 400) {
          this.errorSignUpEl!.nativeElement.textContent = "Registration was unsuccessful";
        }
      }
    });
  }

  submitSignIn(): void {
    if (!AuthComponent.isValidEmail(this.signInObj.email)) {
      this.errorSignInEl!.nativeElement.textContent = "Invalid email";
      return;
    }
    if (this.signInObj.password.length < 8 || !AuthComponent.hasCapitalLetter(this.signInObj.password)) {
      this.errorSignInEl!.nativeElement.textContent = "Password must have at least 8 symbols and a capital letter";
      return;
    }

    this.isLoading = true;

    this.authenticationService.signIn({
      email: this.signInObj.email,
      password: this.signInObj.password
    }).subscribe({
      next: (response) => {
        this.authenticationService.validate(response);
        window.location.reload();
        this.router.navigate(['home']);
      },
      error: err => {
        this.isLoading = false;
        if (err.status == 400) {
          this.errorSignInEl!.nativeElement.textContent = "Signing in unsuccessful";
        }
        if (err.status == 401) {
          this.errorSignInEl!.nativeElement.textContent = "Wrong email or password";
        }
        if (err.status == 404) {
          this.errorSignInEl!.nativeElement.textContent = "User with this email do not exist";

        }
      }
    });
  }


  private static hasCapitalLetter(input: string): boolean {
    const capitalLetterRegex = /[A-Z]/;
    return capitalLetterRegex.test(input);
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}

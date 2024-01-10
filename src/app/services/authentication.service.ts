import { Injectable } from '@angular/core';
import { from, Observable } from "rxjs";
import { authParams } from '../models/types'
import { HttpClient } from "@angular/common/http";
import { UrlsConfig } from "../conficuration/url-config";
import { Utils } from "../models/utils";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }

  validate(response: Object) {
    // @ts-ignore
    localStorage.setItem('userId', response['user']['ID']);
    // @ts-ignore
    localStorage.setItem('currentUser', response['user']['email']);
    // @ts-ignore
    localStorage.setItem('userRole', response['user']['role']);
    // @ts-ignore
    localStorage.setItem('accessToken', response['access_token']);
  }

  signIn(params: authParams): Observable<any> {
    const body = {
      email: params.email,
      password: params.password
    }
    return from(this.httpClient.post(UrlsConfig.LOG_IN_ENDPOINT, body));
  }

  signUp(params: authParams): Observable<any> {
    const body = {
      email: params.email,
      password: params.password
    }
    return from(this.httpClient.post(UrlsConfig.USERS_ENDPOINT, body));
  }

  signOut(): void {
    localStorage.setItem('currentUser', "");
    localStorage.setItem('currentUsersID', "");
    localStorage.setItem('accessToken', "");
  }

  getPayload(): any {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return;
  }

  isAuthenticated(): boolean {
    const payload = this.getPayload();
    if (payload) {
      const expirationDate = new Date(payload.expires_at);
      const today = new Date();

      return expirationDate >= today;
    }
    return false;
  }

  isAuthenticatedUserAdmin():boolean {
    if (!this.isAuthenticated()){
      return false;
    }
    const payload = this.getPayload();
    if (payload) {
      return payload.role == Utils.AdminRole;
    }
    return false;
  }
}

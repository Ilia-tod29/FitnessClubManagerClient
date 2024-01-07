import { Injectable } from '@angular/core';
import { from, Observable, of } from "rxjs";
import { authParams } from '../models/types'
import { HttpClient } from "@angular/common/http";
import { UrlsConfig } from "../conficuration/url-config";


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
}

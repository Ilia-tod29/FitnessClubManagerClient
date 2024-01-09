import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as Types from "../models/types";
import { UrlsConfig } from "../conficuration/url-config";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  headers: HttpHeaders | undefined;
  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
  }

  createCheckoutSession(req: Types.createCheckoutSessionParams) {
    return this.httpClient.post<string>(UrlsConfig.CHECKOUT_SESSION_ENDPOINT, req, { headers: this.headers })
  }
}

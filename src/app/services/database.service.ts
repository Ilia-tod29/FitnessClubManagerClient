import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UrlsConfig } from "../conficuration/url-config";
import { UserDTO } from "../models/userDTO";
import { SubscriptionDTO } from "../models/subscriptionDTO";
import { InventoryItemDTO } from "../models/inventoryItemDTO";
import { GalleryItemDTO } from "../models/galleryItemDTO";
import * as Types from "../models/types";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  headers: HttpHeaders | undefined;
  constructor(private httpClient: HttpClient) {
    const accessToken = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    });
  }

  // Users
  getAllUsers() {
    return this.httpClient.get<UserDTO[]>(UrlsConfig.GET_ALL_USERS_ENDPOINT, { headers: this.headers });
  }
  getUser(id: number) {
    return this.httpClient.get<UserDTO>(`${UrlsConfig.USERS_ENDPOINT}/${id}`, { headers: this.headers });
  }
  updateUser(req: Types.updateUserParams) {
    return this.httpClient.put<UserDTO>(UrlsConfig.USERS_ENDPOINT, req, { headers: this.headers });
  }
  deleteUser(id: number) {
    return this.httpClient.delete<UserDTO>(`${UrlsConfig.USERS_ENDPOINT}/${id}`, { headers: this.headers });
  }

  // Subscriptions
  getAllSubscriptions() {
    return this.httpClient.get<SubscriptionDTO[]>(UrlsConfig.GET_ALL_SUBSCRIPTIONS_ENDPOINT, { headers: this.headers });
  }
  getSubscription(id: number) {
    return this.httpClient.get<SubscriptionDTO>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${id}`, { headers: this.headers });
  }
  getSubscriptionForAGivenUser(email: string) {
    return this.httpClient.get<SubscriptionDTO[]>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${email}`, { headers: this.headers });
  }
  deleteSubscription(id: number) {
    return this.httpClient.delete<SubscriptionDTO>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${id}`, { headers: this.headers });
  }

  // Inventory items
  createInventoryItem(req: Types.createOrUpdateInventoryItem) {
    return this.httpClient.post<InventoryItemDTO>(UrlsConfig.INVENTORY_ITEMS_ENDPOINT, req, { headers: this.headers })
  }
  getAllInventoryItems() {
    return this.httpClient.get<InventoryItemDTO[]>(UrlsConfig.GET_ALL_INVENTORY_ITEMS_ENDPOINT);
  }
  getInventoryItem(id: number) {
    return this.httpClient.get<InventoryItemDTO>(`${UrlsConfig.INVENTORY_ITEMS_ENDPOINT}/${id}`);
  }
  updateInventoryItem(req: Types.createOrUpdateInventoryItem) {
    return this.httpClient.put<InventoryItemDTO>(UrlsConfig.INVENTORY_ITEMS_ENDPOINT, req, { headers: this.headers });
  }
  deleteInventoryItem(id: number) {
    return this.httpClient.delete<InventoryItemDTO>(`${UrlsConfig.INVENTORY_ITEMS_ENDPOINT}/${id}`, { headers: this.headers });
  }

  // Gallery
  createGalleryItem(req: Types.createOrUpdateGalleryItem) {
    return this.httpClient.post<GalleryItemDTO>(UrlsConfig.GALLERY_ENDPOINT, req, { headers: this.headers })
  }
  getAllGalleryItems() {
    return this.httpClient.get<GalleryItemDTO[]>(UrlsConfig.GET_ALL_GALLERY_ITEMS_ENDPOINT);
  }
  getGalleryItem(id: number) {
    return this.httpClient.get<GalleryItemDTO>(`${UrlsConfig.GALLERY_ENDPOINT}/${id}`);
  }
  updateGalleryItem(req: Types.createOrUpdateGalleryItem) {
    return this.httpClient.put<GalleryItemDTO>(UrlsConfig.GALLERY_ENDPOINT, req, { headers: this.headers });
  }
  deleteGalleryItem(id: number) {
    return this.httpClient.delete<GalleryItemDTO>(`${UrlsConfig.GALLERY_ENDPOINT}/${id}`, { headers: this.headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
  constructor(private httpClient: HttpClient) { }

  // Users
  getAllUsers() {
    return this.httpClient.get<UserDTO[]>(UrlsConfig.GET_ALL_USERS_ENDPOINT);
  }
  getUser(id: number) {
    return this.httpClient.get<UserDTO>(`${UrlsConfig.USERS_ENDPOINT}/${id}`);
  }
  updateUser(req: Types.updateUserParams) {
    return this.httpClient.put<UserDTO>(UrlsConfig.USERS_ENDPOINT, req);
  }
  deleteUser(id: number) {
    return this.httpClient.delete<UserDTO>(`${UrlsConfig.USERS_ENDPOINT}/${id}`);
  }

  // Subscriptions
  getAllSubscriptions() {
    return this.httpClient.get<SubscriptionDTO[]>(UrlsConfig.GET_ALL_SUBSCRIPTIONS_ENDPOINT);
  }
  getSubscription(id: number) {
    return this.httpClient.get<SubscriptionDTO>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${id}`);
  }
  getSubscriptionForAGivenUser(email: string) {
    return this.httpClient.get<SubscriptionDTO[]>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${email}`);
  }
  deleteSubscription(id: number) {
    return this.httpClient.delete<SubscriptionDTO>(`${UrlsConfig.SUBSCRIPTIONS_ENDPOINT}/${id}`);
  }

  // Inventory items
  createInventoryItem(req: Types.createOrUpdateInventoryItem) {
    return this.httpClient.post<InventoryItemDTO>(UrlsConfig.INVENTORY_ITEMS_ENDPOINT, req)
  }
  getAllInventoryItems() {
    return this.httpClient.get<InventoryItemDTO[]>(UrlsConfig.GET_ALL_INVENTORY_ITEMS_ENDPOINT);
  }
  getInventoryItem(id: number) {
    return this.httpClient.get<InventoryItemDTO>(`${UrlsConfig.INVENTORY_ITEMS_ENDPOINT}/${id}`);
  }
  updateInventoryItem(req: Types.createOrUpdateInventoryItem) {
    return this.httpClient.put<InventoryItemDTO>(UrlsConfig.INVENTORY_ITEMS_ENDPOINT, req);
  }
  deleteInventoryItem(id: number) {
    return this.httpClient.delete<InventoryItemDTO>(`${UrlsConfig.INVENTORY_ITEMS_ENDPOINT}/${id}`);
  }

  // Gallery
  createGalleryItem(req: Types.createOrUpdateGalleryItem) {
    return this.httpClient.post<GalleryItemDTO>(UrlsConfig.GALLERY_ENDPOINT, req)
  }
  getAllGalleryItems() {
    return this.httpClient.get<UserDTO[]>(UrlsConfig.GET_ALL_GALLERY_ITEMS_ENDPOINT);
  }
  getGalleryItem(id: number) {
    return this.httpClient.get<UserDTO>(`${UrlsConfig.GALLERY_ENDPOINT}/${id}`);
  }
  updateGalleryItem(req: Types.createOrUpdateGalleryItem) {
    return this.httpClient.put<UserDTO>(UrlsConfig.GALLERY_ENDPOINT, req);
  }
  deleteGalleryItem(id: number) {
    return this.httpClient.delete<UserDTO>(`${UrlsConfig.GALLERY_ENDPOINT}/${id}`);
  }
}

export class UrlsConfig {
  // The URL for accessing the back end.
  static readonly API: string = "http://localhost:8080";

  // User related endpoints
  static readonly USERS_ENDPOINT: string = `${this.API}/users`;
  static readonly GET_ALL_USERS_ENDPOINT: string = `${this.API}/allusers`;

  // Subscription related endpoints
  static readonly SUBSCRIPTIONS_ENDPOINT: string = `${this.API}/subscriptions`;
  static readonly GET_ALL_SUBSCRIPTIONS_ENDPOINT: string = `${this.API}/allsubscriptions`;
  static readonly GET_SUBSCRIPTIONS_BY_USER_ENDPOINT: string = `${this.API}/subscriptions/user`;

  // Inventory items related endpoints
  static readonly INVENTORY_ITEMS_ENDPOINT: string = `${this.API}/inventoryitems`;
  static readonly GET_ALL_INVENTORY_ITEMS_ENDPOINT: string = `${this.API}/allinventoryitems`;

  // Gallery related endpoints
  static readonly GALLERY_ENDPOINT: string = `${this.API}/gallery`;
  static readonly GET_ALL_GALLERY_ITEMS_ENDPOINT: string = `${this.API}/allgallery`;

  // Auth related endpoints
  static readonly LOG_IN_ENDPOINT: string = `${this.API}/users/login`;
  static readonly REFRESH_TOKEN_ENDPOINT: string = `${this.API}/tokens/renew_access`;

  // Payment related endpoints
  static readonly CHECKOUT_SESSION_ENDPOINT: string = `${this.API}/create-checkout-session`;
}

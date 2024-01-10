import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { InventoryItemDTO } from "../../models/inventoryItemDTO";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss', '../../auth/auth/auth.component.scss']
})
export class InventoryComponent implements OnInit {
  images: InventoryItemDTO[] = [];
  inventoryItemName = "";
  isAuthenticatedUserAdmin = false;

  constructor(private databaseService: DatabaseService,
              private authService: AuthenticationService,
              private alertService: AlertService) {}

  ngOnInit() {
    this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
    this.databaseService.getAllInventoryItems().subscribe({
     next: res => {
      this.images = res
    },
    error: () => {
      this.alertService.showAlert("Unable to load images");
    }});
  }
}

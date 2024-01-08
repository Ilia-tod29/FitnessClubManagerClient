import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { InventoryItemDTO } from "../../models/inventoryItemDTO";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss', '../../auth/auth/auth.component.scss']
})
export class InventoryComponent implements OnInit {
  images: InventoryItemDTO[] = [];
  inventoryItemName = "";

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.databaseService.getAllInventoryItems().subscribe(res => {
      this.images = res
    })
  }
}

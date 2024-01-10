import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { DatabaseService } from "../services/database.service";
import { Router } from "@angular/router";
import { createOrUpdateGalleryItem, createOrUpdateInventoryItem } from "../models/types";
import { RoutesConfig } from "../conficuration/routes";
import { AlertService } from "../services/alert.service";

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {
  @Input() InventoryName: string | undefined;
  imageName: string = "";
  currentUser: string | null = null;
  shouldVisualizeBtns: boolean = false;
  files: File[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private databaseService: DatabaseService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser')
  }

  onFileChanged(fileInput: any): void {
    const fileReader = new FileReader();
    if (fileInput.addedFiles.length > 1 || this.files.length == 1) {
      this.alertService.showAlert("Only one file is allowed!");
      return;
    }
    this.shouldVisualizeBtns = true;

    let currentFile = fileInput.addedFiles[0]
    fileReader.readAsDataURL(currentFile);
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        this.imageName = currentFile['name'];
        this.files.push(currentFile);
      } else {
        this.alertService.showAlert("The file is null");
        return;
      }
    }
    fileReader.onerror = (error) => {
      this.alertService.showAlert("Could not read the file");
      console.log(error);
    }

  }

  onRemove(event: any): void {
    const indexOfEventToRemove = this.files.indexOf(event);
    this.files.splice(indexOfEventToRemove, 1);
    this.imageName = "";
    this.shouldVisualizeBtns = false;
  }

  onUpload(): void {
    console.log(this.InventoryName)
    if (this.InventoryName == undefined || this.InventoryName == "") {
      if (this.router.url == `/${RoutesConfig.Inventory}`) {
        this.alertService.showAlert("Inventory name must be filled!")
        return
      }
        const galleryItem: createOrUpdateGalleryItem = {
        image: this.imageName
      }
      this.databaseService.createGalleryItem(galleryItem).subscribe({
        next: res => {
        this.alertService.showAlertWithRefresh(`Image: ${res.image} created successfully at: ${res.created_at}`)
      },
      error: err => {
        this.alertService.showAlert(err.statusText);
      }});
    } else {
      const inventoryItem: createOrUpdateInventoryItem = {
        name: this.InventoryName,
        image: this.imageName,
      }
      this.databaseService.createInventoryItem(inventoryItem).subscribe({
        next: res => {
          this.alertService.showAlertWithRefresh(`Inventory item: ${res.name} created successfully at: ${res.created_at}`)
        },
        error: err => {
          this.alertService.showAlert(err.statusText);
        }});
    }
  }

  uploadImage(): void {
    if (this.files.length > 0 && this.imageName != "") {
      this.shouldVisualizeBtns = false;
      this.onUpload();
      this.clearImage();
    }
  }

  signOut() {
    this.authenticationService.signOut();
    this.router.navigate(['auth'])
  }

  clearImage() {
    console.log("clearing")
    this.files = [];
    this.imageName = "";
    this.shouldVisualizeBtns = false;
  }
}

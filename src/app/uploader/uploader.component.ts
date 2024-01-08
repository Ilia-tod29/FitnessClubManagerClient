import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authentication.service";
import { DatabaseService } from "../services/database.service";
import { Router } from "@angular/router";
import { createOrUpdateGalleryItem, createOrUpdateInventoryItem } from "../models/types";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser')
  }

  onFileChanged(fileInput: any): void {
    const fileReader = new FileReader();
    if (fileInput.addedFiles.length > 1 || this.files.length == 1) {
      this.showAlert("Only one file is allowed!");
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
        this.showAlert("The file is null");
        return;
      }
    }
    fileReader.onerror = (error) => {
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
    const currentUserRole = localStorage.getItem('userRole');
    if (currentUserRole == "admin") {
      if (this.InventoryName == undefined || this.InventoryName == "") {
        console.log("posting...")
        const galleryItem: createOrUpdateGalleryItem = {
          image: this.imageName
        }
        this.databaseService.createGalleryItem(galleryItem).subscribe(res => {
          this.showAlert(`Image ${res.image} created successfully at: ${res.created_at}`)
        },
        error => {
          this.showAlert(error.statusText);
        })
      } else {
        const inventoryItem: createOrUpdateInventoryItem = {
          name: this.InventoryName,
          image: this.imageName,
        }
        this.databaseService.createInventoryItem(inventoryItem)
      }
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

  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['info-snackbar'],
    });
  }
}

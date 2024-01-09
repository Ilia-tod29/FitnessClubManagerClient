import { Component, OnInit } from '@angular/core';
import { UserDTO } from "../../models/userDTO";
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.scss']
})
export class UserWrapperComponent implements OnInit {

  users: UserDTO[] | undefined;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.databaseService.getAllUsers().subscribe(res => {
        this.users = res;
      },
      () => {
        this.alertService.showAlert("Unable to load users.");
      })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from "../../models/userDTO";
import { Utils } from "../../models/utils";
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";
import { updateUserParams } from "../../models/types";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  @Input() user!: UserDTO;
  hasActiveSubscription = "";
  isCurrentUserSuspended: boolean | undefined;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService) {}


  ngOnInit() {
    this.hasActiveSubscription = "No information";
    this.isCurrentUserSuspended = this.user.suspended
    if (this.user.role == Utils.AdminRole) {
      this.hasActiveSubscription = Utils.AdminRole;
    } else {
      this.databaseService.getSubscriptionForAGivenUser(this.user.id!).subscribe(res => {
        if (res.length == 0) {
          this.hasActiveSubscription = "No"
        } else {
          res.map(subscription => {
            const startDate = this.parseDate(subscription.start_date!);
            const endDate = this.parseDate(subscription.end_date!);
            const today = new Date();

            if (startDate != null && endDate != null) {
              if (today >= startDate && today <= endDate) {
                this.hasActiveSubscription = "Yes"
              } else {
                this.hasActiveSubscription = "No"
              }
            }
          })
        }
      })
    }

  }

  toggleSuspension(): void {
    if (this.user.role == Utils.AdminRole) {
      this.alertService.showAlert("Cannot suspend Admin accounts");
      this.isCurrentUserSuspended = !this.isCurrentUserSuspended;
      return
    }
    const updateParameters: updateUserParams = {
      id: this.user.id!,
      suspended: (!this.isCurrentUserSuspended).toString()
    }
    this.databaseService.updateUser(updateParameters).subscribe(res => {
      if (res.suspended) {
        this.alertService.showAlert(`${res.email} was suspended!`)
      } else {
        this.alertService.showAlert(`${res.email} was UNsuspended!`)
      }
    })
  }

  deleteUser(): void {
    if (this.user.role == Utils.AdminRole) {
      this.alertService.showAlert("Cannot delete Admin accounts");
      return;
    }
    this.alertService.confirmAlert("Are you sure you want to delete this image?").subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.databaseService.deleteUser(this.user.id!).subscribe(res => {
            this.alertService.showAlertWithRefresh(`User: ${res.email} successfully deleted`)
          },
          error => {
            this.alertService.showAlert(error.statusText);
          })
      }
    });
  }

  parseDate(date: string): Date | null {
    const parts = date.split("-");

    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
      const year = parseInt(parts[2], 10);

      return new Date(year, month, day);
    }

    return null;
  }
}

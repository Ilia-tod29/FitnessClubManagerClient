import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from "../../models/userDTO";
import { SubscriptionDTO } from "../../models/subscriptionDTO";
import { Utils } from "../../models/utils";
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  @Input() subscription!: SubscriptionDTO;
  user: UserDTO | undefined;
  isValidSubscription = false;
  authenticatedUserRole = "";
  adminRole = Utils.AdminRole;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.authenticatedUserRole = localStorage.getItem("userRole")!;
    const startDate = this.alertService.parseDate(this.subscription.start_date!);
    const endDate = this.alertService.parseDate(this.subscription.end_date!);
    const today = new Date();

    if (startDate != null && endDate != null && (today >= startDate && today <= endDate)) {
      this.isValidSubscription = true;
    }

    this.databaseService.getUser(this.subscription.user_id!).subscribe(res => {
      this.user = res;
    },
    () => {
      this.alertService.showAlert("Subscription's owner not found.");
      this.user = new UserDTO(-1, "UserNotFound");
    })
  }

  deleteSubscription(): void {
    if (this.authenticatedUserRole != Utils.AdminRole) {
      this.alertService.showAlert("Users cannot delete subscriptions!");
      return;
    }
    this.alertService.confirmAlert("Are you sure you want to delete this subscription?").subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.databaseService.deleteSubscription(this.subscription.id!).subscribe(() => {
            this.alertService.showAlertWithRefresh(`Subscription successfully deleted!`)
          },
          error => {
            this.alertService.showAlert(error.statusText);
          })
      }
    });
  }

}

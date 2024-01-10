import { Component, Input, OnInit } from '@angular/core';
import { UserDTO } from "../../models/userDTO";
import { SubscriptionDTO } from "../../models/subscriptionDTO";
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  @Input() subscription!: SubscriptionDTO;
  user: UserDTO | undefined;
  subscriptionStatus = "unknown";
  isAuthenticatedUserAdmin = false;

  constructor(private databaseService: DatabaseService,
              private authService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
    const payload = this.authService.getPayload();
    const startDate = this.alertService.parseDate(this.subscription.start_date!);
    const endDate = this.alertService.parseDate(this.subscription.end_date!);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (payload.suspend) {
      this.subscriptionStatus = "suspended";
    } else {
      if (startDate != null && endDate != null) {
        if (today >= startDate && today <= endDate) {
          this.subscriptionStatus = "active";
        }
        if (today > endDate) {
          this.subscriptionStatus = "passed"
        }
        if (today < startDate) {
          this.subscriptionStatus = "toBeActive"
        }
      }
    }

    if (this.isAuthenticatedUserAdmin){
      this.databaseService.getUser(this.subscription.user_id!).subscribe({
        next: res => {
          this.user = res;
          if (this.user.suspended) {
            this.subscriptionStatus = "suspended";
          }
        },
        error: () => {
          this.alertService.showAlert("Subscription's owner not found.");
          this.user = new UserDTO(-1, "UserNotFound");
        }});
    } else {
      const payload = this.authService.getPayload();
      this.user = new UserDTO(+payload.id, payload.email, payload.role);
    }

  }

  deleteSubscription(): void {
    if (this.isAuthenticatedUserAdmin) {
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

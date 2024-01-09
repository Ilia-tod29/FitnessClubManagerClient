import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";
import { Utils } from "../../models/utils";
import { SubscriptionDTO } from "../../models/subscriptionDTO";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from "../../services/payment.service";
import { DatePipe } from "@angular/common";
import * as Types from "../../models/types";


@Component({
  selector: 'app-subsctiptions-wrapper',
  templateUrl: './subsctiptions-wrapper.component.html',
  styleUrls: ['./subsctiptions-wrapper.component.scss'],
  providers: [DatePipe],
})
export class SubsctiptionsWrapperComponent implements OnInit {

  subscriptions: SubscriptionDTO[] | undefined;
  payForm: FormGroup;
  authenticatedUserRole = "";
  adminRole = Utils.AdminRole;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService,
              private paymentService: PaymentService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
    this.payForm = this.fb.group({
      startDate: [null, [Validators.required, this.startDateValidator]]
    });
  }

  ngOnInit(): void {
    this.authenticatedUserRole = localStorage.getItem("userRole")!;
    if (this.authenticatedUserRole == Utils.AdminRole){
      this.databaseService.getAllSubscriptions().subscribe(res => {
          this.subscriptions = res;
        },
        () => {
          this.alertService.showAlert("Unable to load subscriptions.");
        })
    } else {
      const authenticatedUserId = localStorage.getItem("userId")!;
      this.databaseService.getSubscriptionForAGivenUser(+authenticatedUserId).subscribe(res => {
          this.subscriptions = res;
        },
        () => {
          this.alertService.showAlert("Unable to load subscriptions.");
        })
    }
  }

  startDateValidator(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (selectedDate < yesterday) {
      return { 'startDateError': true };
    }

    return null;
  }

  pay() {
    if (this.authenticatedUserRole == Utils.AdminRole) {
      this.alertService.showAlert("Admins cannot have subscriptions.");
      return
    }
    const startDate: Date | null = this.payForm.get('startDate')?.value;
    if (startDate) {
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      const formattedStartDate = this.datePipe.transform(startDate, "dd.MM.yyyy");
      const formattedEndDate = this.datePipe.transform(endDate, "dd.MM.yyyy");

      if (formattedEndDate && formattedStartDate) {
        const req: Types.createCheckoutSessionParams = {
          start_date: formattedStartDate,
          end_date: formattedEndDate
        }
        this.paymentService.createCheckoutSession(req).subscribe(redirectUrl => {
          window.location.href = redirectUrl;
        },
        err => {
          let errorMsg = err.error.error == "the start date cannot be within the validity period of another subscription" ? err.error.error : "";
          if (err.status == 401) {
            errorMsg = "Unauthorized";
          }
          this.alertService.showAlert("Unable to checkout payment: " + errorMsg);
        })
        this.payForm.reset();
      } else {
        this.alertService.showAlert("Unable to parse date.");
      }
    } else {
      this.alertService.showAlert("Unable to read date.");
    }
  }
}

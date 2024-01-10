import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";
import { SubscriptionDTO } from "../../models/subscriptionDTO";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from "../../services/payment.service";
import { DatePipe } from "@angular/common";
import * as Types from "../../models/types";
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { AuthenticationService } from "../../services/authentication.service";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};
@Component({
  selector: 'app-subsctiptions-wrapper',
  templateUrl: './subsctiptions-wrapper.component.html',
  styleUrls: ['./subsctiptions-wrapper.component.scss'],
  providers: [
    DatePipe,
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ],
})
export class SubsctiptionsWrapperComponent implements OnInit {

  subscriptions: SubscriptionDTO[] | undefined;
  payForm: FormGroup;
  isAuthenticatedUserAdmin = false;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService,
              private paymentService: PaymentService,
              private authService: AuthenticationService,
              private fb: FormBuilder,
              private datePipe: DatePipe) {
    this.payForm = this.fb.group({
      startDate: [null, [Validators.required, this.startDateValidator]]
    });
  }

  ngOnInit(): void {
    this.isAuthenticatedUserAdmin = this.authService.isAuthenticatedUserAdmin();
    if (this.isAuthenticatedUserAdmin){
      this.databaseService.getAllSubscriptions().subscribe({
        next: res => {
          res.map(subscription => {
            subscription.start_date = subscription.start_date?.split('-').reverse().join('-');
            subscription.end_date = subscription.end_date?.split('-').reverse().join('-');
            return subscription;
          })
          this.subscriptions = res;
        },
        error: () => {
          this.alertService.showAlert("Unable to load subscriptions.");
        }})
    } else {
      const authenticatedUserId = localStorage.getItem("userId")!;
      this.databaseService.getSubscriptionForAGivenUser(+authenticatedUserId).subscribe({
        next: res => {
          res.map(subscription => {
              subscription.start_date = subscription.start_date?.split('-').reverse().join('-');
              subscription.end_date = subscription.end_date?.split('-').reverse().join('-');
              return subscription;
            })
          this.subscriptions = res;
        },
        error: () => {
          this.alertService.showAlert("Unable to load subscriptions.");
        }});
    }
  }

  startDateValidator(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (selectedDate < today) {
      return { 'startDateError': true };
    }

    return null;
  }

  pay() {
    if (this.isAuthenticatedUserAdmin) {
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

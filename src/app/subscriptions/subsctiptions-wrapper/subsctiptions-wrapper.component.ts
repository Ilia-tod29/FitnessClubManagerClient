import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from "../../services/database.service";
import { AlertService } from "../../services/alert.service";
import { Utils } from "../../models/utils";
import { SubscriptionDTO } from "../../models/subscriptionDTO";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subsctiptions-wrapper',
  templateUrl: './subsctiptions-wrapper.component.html',
  styleUrls: ['./subsctiptions-wrapper.component.scss']
})
export class SubsctiptionsWrapperComponent implements OnInit {

  subscriptions: SubscriptionDTO[] | undefined;
  payForm: FormGroup;
  @ViewChild('errorMessage') errorMessageEl: ElementRef | undefined;

  constructor(private databaseService: DatabaseService,
              private alertService: AlertService,
              private fb: FormBuilder) {
    this.payForm = this.fb.group({
      startDate: [null, [Validators.required, this.startDateValidator]]
    });
  }

  ngOnInit(): void {
    const currentUserRole = localStorage.getItem("userRole");
    if (currentUserRole == Utils.AdminRole){
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

    if (selectedDate < today) {
      return { 'startDateError': true };
    }

    return null;
  }

  pay() {
    // this.payFormGroup.reset()
  }

  onSubmit() {

  }
}

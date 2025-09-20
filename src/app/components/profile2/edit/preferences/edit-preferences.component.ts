import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface PreferencesDetails {
  seatPreferences: string;
  meal: string;
  frequentFlyerNumber: string;
  frequentFlyerAirlines: string;
  travelAlerts: boolean;
  allBillingEntities: boolean;
}


@Component({
  standalone: true,
  selector: 'app-edit-preferences',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css']
})
export class EditPreferencesComponent implements OnInit {
  @Input() preferencesDetails: PreferencesDetails = {
    seatPreferences: '',
    meal: '',
    frequentFlyerNumber: '345',
    frequentFlyerAirlines: '',
    travelAlerts: true,
    allBillingEntities: true
  };

  @Output() dataToParent = new EventEmitter<PreferencesDetails>();
  @Output() cancelEdit = new EventEmitter<void>();

  preferencesForm!: FormGroup;
  originalDetails: PreferencesDetails = {
    seatPreferences: '',
    meal: '',
    frequentFlyerNumber: '345',
    frequentFlyerAirlines: '',
    travelAlerts: true,
    allBillingEntities: true
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.originalDetails = { ...this.preferencesDetails };
    console.log(this.originalDetails )
    this.initializeForm();
  }

  initializeForm() {
    this.preferencesForm = this.fb.group({
      seatPreferences: [this.preferencesDetails.seatPreferences || '', [Validators.required]],
      meal: [this.preferencesDetails.meal || '', [Validators.required]],
      frequentFlyerNumber: [this.preferencesDetails.frequentFlyerNumber || '345', [Validators.required]],
      frequentFlyerAirlines: [this.preferencesDetails.frequentFlyerAirlines || '', [Validators.required]],
    });
  }

  hasError(controlName: string): boolean {
    const control = this.preferencesForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.preferencesForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(controlName)} is required`;
      }
    }
    return '';
  }

  getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      seatPreferences: 'Seat preferences',
      meal: 'Meal',
      frequentFlyerNumber: 'Frequent flyer number',
      frequentFlyerAirlines: 'Frequent flyer airlines'
    };
    return labels[controlName] || controlName;
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    Object.keys(this.preferencesForm.controls).forEach(key => {
      const control = this.preferencesForm.get(key);
      if (control && control.errors) {
        Object.keys(control.errors).forEach(errorKey => {
          if (errorKey === 'required') {
            errors.push(`${this.getFieldLabel(key)} is required`);
          }
        });
      }
    });
    return errors;
  }

  cancelEditAction() {
    this.preferencesForm.patchValue(this.originalDetails);
    console.log('Edit cancelled, form reset');
    this.cancelEdit.emit();
  }

  updatePreferences() {
    if (this.preferencesForm.valid) {
      const formData = this.preferencesForm.value;

      this.originalDetails = { ...this.originalDetails, ...formData };
      console.log('Updating preferences:', this.originalDetails);
      this.dataToParent.emit(this.originalDetails);
    } else {
      this.preferencesForm.markAllAsTouched();
      const errors = this.getFormErrors();
      alert(`Please fix the following errors:\n${errors.join('\n')}`);
    }
  }

  toggle(x:number){
    if (x==1) {
      this.originalDetails.travelAlerts=!this.originalDetails.travelAlerts
    }
    else if(x==2){
      this.originalDetails.allBillingEntities=!this.originalDetails.allBillingEntities
    }
  }
}

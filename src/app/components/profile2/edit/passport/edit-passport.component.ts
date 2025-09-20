import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface PassportDetails {
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  passportNumber: string;
  issuingCountry: string;
  dateOfIssue: string;
  dateOfExpiration: string;
  dateOfBirth: string;
  nationality: string;
  countryOfResidence: string;
  emailAddress: string;
  countryCode: string;
  mobileNumber: string;
  confirmation: boolean;
}

@Component({
  selector: 'app-edit-passport',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-passport.component.html',
  styleUrl: './edit-passport.component.css'
})
export class EditPassportComponent implements OnInit {
  @Input() passportDetails?: PassportDetails
  @Input() isMember:boolean=false
  @Input() title:string=''
  @Output() dataToParent = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  passportForm!: FormGroup;
  originalDetails: PassportDetails = {
    firstName: '',
    middleName: '',
    lastName: '',
    passportNumber: '',
    issuingCountry: '',
    dateOfIssue: '',
    dateOfExpiration: '',
    dateOfBirth: '',
    nationality: '',
    countryOfResidence: '',
    emailAddress: '',
    countryCode: '+966',
    mobileNumber: '',
    confirmation: false
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log("resv "+this.passportDetails?.countryCode)
    this.originalDetails = {
      ...this.originalDetails,
      ...this.passportDetails,
      countryCode: this.passportDetails?.countryCode || '+966'
    };
    this.initializeForm();
  }

  formatDate(date: string | Date): string {
    if (!date) return '';

    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;


  }
  // Convert DD/MM/YYYY to YYYY-MM-DD for date inputs
  convertToDateInput(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  }

  // Convert YYYY-MM-DD to DD/MM/YYYY for storage
  convertFromDateInput(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  initializeForm() {
    this.passportForm = this.fb.group({
      title: [this.passportDetails?.title || ''],
      firstName: [this.passportDetails?.firstName || '', [Validators.required, Validators.minLength(2)]],
      middleName: [this.passportDetails?.middleName || ''],
      lastName: [this.passportDetails?.lastName || '', [Validators.required, Validators.minLength(2)]],
      passportNumber: [this.passportDetails?.passportNumber || '', [Validators.required]],
      issuingCountry: [this.passportDetails?.issuingCountry || '', [Validators.required]],
      dateOfIssue: [this.formatDate(this.passportDetails?.dateOfIssue || '') || '', [Validators.required]],
      dateOfExpiration: [this.formatDate(this.passportDetails?.dateOfExpiration || '') || '', [Validators.required]],
      dateOfBirth: [this.formatDate(this.passportDetails?.dateOfBirth || '') || '', [Validators.required]],
      nationality: [this.passportDetails?.nationality || '', [Validators.required]],
      countryOfResidence: [this.passportDetails?.countryOfResidence || '', [Validators.required]],
      emailAddress: [this.passportDetails?.emailAddress || '', [Validators.email]],
      countryCode: [this.passportDetails?.countryCode || '+966', [Validators.required]],
      mobileNumber: [this.passportDetails?.mobileNumber || '', [Validators.required]],
      confirmation: [this.passportDetails?.confirmation || false, [Validators.requiredTrue]]
    });
  }

  cancelEditAction() {
    this.passportForm.patchValue(this.originalDetails);
    console.log('Edit cancelled, form reset');
    this.cancelEdit.emit();
  }

  updatePassportDetails() {
    if (this.passportForm.valid) {
      const formData = this.passportForm.value;

      // Convert date inputs back to DD/MM/YYYY format

      this.originalDetails = { ...this.originalDetails,...formData };
      console.log('Updating passport details:', this.originalDetails);
      this.dataToParent.emit(this.originalDetails);
    } else {
      this.passportForm.markAllAsTouched();
      const errors = this.getFormErrors();
      // alert(`Please fix the following errors:\n${errors.join('\n')}`);
    }
  }

  addMorePassport() {
    console.log('Add more passport clicked');
    // Implement add more passport logic
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    const form = this.passportForm;

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors && control.touched) {
        if (control.errors['required']) {
          errors.push(`${this.getFieldDisplayName(key)} is required`);
        } else if (control.errors['minlength']) {
          errors.push(`${this.getFieldDisplayName(key)} must be at least ${control.errors['minlength'].requiredLength} characters`);
        } else if (control.errors['email']) {
          errors.push(`${this.getFieldDisplayName(key)} must be a valid email address`);
        } else if (control.errors['requiredTrue']) {
          errors.push('You must confirm all details are correct');
        }
      }
    });

    return errors;
  }

  getFieldDisplayName(key: string): string {
    const displayNames: { [key: string]: string } = {
      title: 'Title',
      firstName: 'First name',
      middleName: 'Middle name',
      lastName: 'Last name',
      passportNumber: 'Passport number',
      issuingCountry: 'Passport issuing country',
      dateOfIssue: 'Date of issue',
      dateOfExpiration: 'Date of expiration',
      dateOfBirth: 'Date of birth',
      nationality: 'Nationality',
      countryOfResidence: 'Country of residence',
      emailAddress: 'Email address',
      countryCode: 'Country code',
      mobileNumber: 'Mobile number',
      confirmation: 'Confirmation'
    };
    return displayNames[key] || key;
  }

  hasError(fieldName: string): boolean {
    const field = this.passportForm.get(fieldName);
    return !!(field && field.errors && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.passportForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      } else if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      } else if (field.errors['email']) {
        return `${this.getFieldDisplayName(fieldName)} must be a valid email address`;
      } else if (field.errors['requiredTrue']) {
        return 'You must confirm all details are correct';
      }
    }

    return '';
  }
}

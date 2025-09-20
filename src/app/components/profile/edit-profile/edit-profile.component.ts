import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  @Input() companyDetails: any = {};
  @Output() dataToParent = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  profileForm!: FormGroup;
  originalDetails: any = {};
  logoPreview: string | null = null;
  selectedLogoFile: File | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.originalDetails = { ...this.companyDetails };
    this.initializeForm();

    // Set initial logo preview if companyDetails has a logo
    if (this.companyDetails.logoUrl) {
      this.logoPreview = this.companyDetails.logoUrl;
    }

    // Subscribe to logoUrl changes to update preview
    this.profileForm.get('logoUrl')?.valueChanges.subscribe(value => {
      this.logoPreview = value;
    });
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      corporateName: [this.companyDetails.corporateName || '', [Validators.required, Validators.minLength(2)]],
      buildingNumber: [this.companyDetails.buildingNumber || '', [Validators.required, Validators.pattern(/^\d+$/)]],
      streetName: [this.companyDetails.streetName || '', [Validators.required, Validators.minLength(2)]],
      district: [this.companyDetails.district || '', [Validators.required, Validators.minLength(2)]],
      city: [this.companyDetails.city || '', [Validators.required, Validators.minLength(2)]],
      postalCode: [this.companyDetails.postalCode || '', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      unitNumber: [this.companyDetails.unitNumber || ''],
      country: [this.companyDetails.country || '', [Validators.required]],
      currency: [this.companyDetails.currency || '', [Validators.required]],
      timezone: [this.companyDetails.timezone || '', [Validators.required]],
      logoFile: [null],
      logoUrl: [this.companyDetails.logoUrl || null]
    });
  }

  cancelEdit() {
    // Reset form to original values
    this.profileForm.patchValue(this.originalDetails);
    console.log('Edit cancelled, form reset');
    this.dataToParent.emit(null)
  }

  saveProfile() {
    if (this.profileForm.valid) {
      // Get form values (logo data is already included in the form)
      const formData = this.profileForm.value;

      // Save the profile
      console.log('Saving profile:', formData);

      // Update original details to current values
      this.originalDetails = { ...formData };
      this.dataToParent.emit(this.originalDetails)
      // Show success message
      // alert('Profile saved successfully!');
    } else {
      // Mark all fields as touched to show validation errors
      this.profileForm.markAllAsTouched();

      // Get validation errors
      const errors = this.getFormErrors();
      // alert(`Please fix the following errors:\n${errors.join('\n')}`);
    }
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    const form = this.profileForm;

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors && control.touched) {
        if (control.errors['required']) {
          errors.push(`${this.getFieldDisplayName(key)} is required`);
        } else if (control.errors['minlength']) {
          errors.push(`${this.getFieldDisplayName(key)} must be at least ${control.errors['minlength'].requiredLength} characters`);
        } else if (control.errors['pattern']) {
          if (key === 'postalCode') {
            errors.push(`${this.getFieldDisplayName(key)} must be 5 digits`);
          } else if (key === 'buildingNumber') {
            errors.push(`${this.getFieldDisplayName(key)} must contain only numbers`);
          }
        }
      }
    });

    return errors;
  }

  getFieldDisplayName(key: string): string {
    const displayNames: { [key: string]: string } = {
      corporateName: 'Corporate name',
      buildingNumber: 'Building number',
      streetName: 'Street name',
      district: 'District/Neighborhood',
      city: 'City name',
      postalCode: 'Postal code',
      unitNumber: 'Unit number',
      country: 'Country',
      currency: 'Currency',
      timezone: 'Time zone'
    };
    return displayNames[key] || key;
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.errors && field.touched);
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      } else if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      } else if (field.errors['pattern']) {
        if (fieldName === 'postalCode') {
          return 'Postal code must be 5 digits';
        } else if (fieldName === 'buildingNumber') {
          return 'Building number must contain only numbers';
        }
      }
    }
    return '';
  }

  // Logo upload methods
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      this.selectedLogoFile = file;

      // Update form controls
      this.profileForm.patchValue({
        logoFile: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoPreview = e.target.result;
        // Update logoUrl in form
        this.profileForm.patchValue({
          logoUrl: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.logoPreview = null;
    this.selectedLogoFile = null;
    this.fileInput.nativeElement.value = '';

    // Update form controls
    this.profileForm.patchValue({
      logoFile: null,
      logoUrl: null
    });
  }
}

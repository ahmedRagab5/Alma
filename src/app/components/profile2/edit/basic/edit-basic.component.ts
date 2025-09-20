import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Basic } from '../../profile2.component';

// interface BasicDetails {
//   completionPercentage: number;
//   gender: string;
//   dateOfBirth: string;
//   role: string;
//   email: string;
//   mobileNumber: string;
//   title: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
// }

@Component({
  selector: 'app-edit-basic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-basic.component.html',
  styleUrl: './edit-basic.component.css'
})
export class EditBasicComponent implements OnInit {
  @Input() basicDetails?: Basic;
  @Input() isMember:boolean=false
  @Input() relationIn?:string=''
  @Output() dataToParent = new EventEmitter<any>();
  @Output() sendRelation = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter<void>();

  basicForm!: FormGroup;
  relation = new FormControl('', [Validators.required, Validators.minLength(3)]);
  originalDetails: Basic ={
    completionPercentage: 0,
    gender:'',
    dateOfBirth:'',
    role: '',
    title: '',
    firstName: '',
    middleName: '',
    lastName: ''
  };

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.originalDetails = { ...this.originalDetails, ...this.basicDetails };
    this.initializeForm();
    if (this.isMember) {
      this.relation.setValue(this.relationIn||'')
    }
  }

  initializeForm() {
    this.basicForm = this.fb.group({
      title: [this.basicDetails?.title || ''],
      firstName: [this.basicDetails?.firstName || '', [Validators.required, Validators.minLength(2)]],
      middleName: [this.basicDetails?.middleName || '', [Validators.required, Validators.minLength(2)]],
      lastName: [this.basicDetails?.lastName || '', [Validators.required, Validators.minLength(2)]],
      gender: [this.basicDetails?.gender || 'Male', [Validators.required]],
      dateOfBirth: [this.formatDate(this.basicDetails?.dateOfBirth || '') || this.formatDate('10/02/2025'),
        [Validators.required]]
    });
  }

  formatDate(date: string | Date): string {
    if (!date) return '';

    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;


  }
  cancelEditAction() {
    // Reset form to original values
    this.basicForm.patchValue(this.originalDetails);
    console.log('Edit cancelled, form reset');
    this.cancelEdit.emit();
  }

  updateBasicDetails() {
    if (this.basicForm.valid) {
      // Get form values
      const formData = this.basicForm.value;

      // Save the basic details


      // Update original details to current values
      this.originalDetails = {...this.originalDetails, ...formData };
      // this.originalDetails.dateOfBirth=this.formatDate(this.originalDetails.dateOfBirth,"send")
      console.log('Updating basic details:', this.originalDetails);
      this.dataToParent.emit(this.originalDetails);

      // Show success message
      // alert('Basic details updated successfully!');
    } else {
      // Mark all fields as touched to show validation errors
      this.basicForm.markAllAsTouched();

      // Get validation errors
      const errors = this.getFormErrors();
      // alert(`Please fix the following errors:\n${errors.join('\n')}`);
    }
  }

  updateRelation(){
    if(this.relation.valid){
      this.sendRelation.emit(this.relation.value||'');
    }
  }

  getFormErrors(): string[] {
    const errors: string[] = [];
    const form = this.basicForm;

    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control && control.errors && control.touched) {
        if (control.errors['required']) {
          errors.push(`${this.getFieldDisplayName(key)} is required`);
        } else if (control.errors['minlength']) {
          errors.push(`${this.getFieldDisplayName(key)} must be at least ${control.errors['minlength'].requiredLength} characters`);
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
      gender: 'Gender',
      dateOfBirth: 'Date of birth'
    };
    return displayNames[key] || key;
  }

  // Helper method to check if a field has errors
  hasError(fieldName: string): boolean {
    const field = this.basicForm.get(fieldName);
    return !!(field && field.errors && field.touched);
  }

  // Helper method to get error message for a field
  getErrorMessage(fieldName: string): string {
    const field = this.basicForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      } else if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }
}

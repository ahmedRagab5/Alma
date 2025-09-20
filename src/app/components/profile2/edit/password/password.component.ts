import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { secrite } from '../../profile2.component';

// interface secrite{

// }

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  constructor(private fb: FormBuilder) {}

  // @Input() data!:secrite
  @Output() dataToParent = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<any>();


  passForm!: FormGroup;

  password:string=''

  ngOnInit(){
    this.initializeForm()
  }

  initializeForm() {
    this.passForm = this.fb.group({
      newPass: [ '',[   Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).+$') ]],
      confirmPass: [ '',[ Validators.required]]

    }, {validators: this.passwordMatchValidator})
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const newPass = formGroup.get('newPass')?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;
    return newPass === confirmPass ? null : { passwordMismatch: true };
  }



  cancelEditAction() {
    // this.passForm.patchValue(this.originalDetails);
    // console.log('Edit cancelled, form reset');
    this.cancelEdit.emit();
  }

  updatePass() {
    if (this.passForm.valid) {



      this.password =this.passForm.get('newPass')?.value;
      this.dataToParent.emit(this.password);
      console.log('vaild')
    } else {
      this.passForm.markAllAsTouched();
      // const errors = this.getFormErrors();
      // alert(`Please fix the following errors:\n${errors.join('\n')}`);
    }
  }

  // getFormErrors(): string[] {
  //   const errors: string[] = [];
  //   const form = this.passForm;

  //   Object.keys(form.controls).forEach(key => {
  //     const control = form.get(key);
  //     if (control && control.errors && control.touched) {
  //       if (control.errors['required']) {
  //         errors.push(`${this.getFieldDisplayName(key)} is required`);
  //       } else if (control.errors['minlength']) {
  //         errors.push(`${this.getFieldDisplayName(key)} must be at least ${control.errors['minlength'].requiredLength} characters`);
  //       } else if(control.errors['pattern']){
  //         errors.push(`${this.getFieldDisplayName(key)} must include at least one uppercase letter, one lowercase letter and one digit`);
  //       }
  //     }
  //   });
  //   if (form.errors?.['passwordMismatch'] && form.get('confirmPass')?.touched) {
  //     errors.push('Passwords do not match');
  //   }

  //   return errors;
  // }
  getErrorMessage(fieldName: string): string {
    const field = this.passForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      } else if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      } else if(field.errors['pattern']){
        return `${this.getFieldDisplayName(fieldName)} must include at least one uppercase letter, one lowercase letter and one digit`;
      } else if (this.passForm.errors?.['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }

    return '';
  }
  isConfirm(){
    if ( this.passForm.get('newPass')?.valid && this.passForm.get('confirmPass')?.valid && this.passForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }
    return ''
  }
  getFieldDisplayName(key: string): string {
    const displayNames: { [key: string]: string } = {
      newPass:'Password',
      confirmPass:'Confirm password',
    }

    return displayNames[key] || key;
  }
}

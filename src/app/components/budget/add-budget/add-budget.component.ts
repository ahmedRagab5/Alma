import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Budget } from '../budget.component';

@Component({
  selector: 'app-add-budget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-budget.component.html',
  styleUrl: './add-budget.component.css'
})
export class AddBudgetComponent implements OnInit {
  @Output() dataToParent = new EventEmitter<any>();
  @Output() cancelToParent = new EventEmitter<void>();
  @Input() data!:Budget

  departmentForm!: FormGroup;
  userForm!: FormGroup;
  newEmployeeForm!:FormGroup
  // employees: FormArray;
  numEmp:number[]=[0]

  radio:FormControl=new FormControl('department')
  // Employee data
  employeeOptions = [
    { id: 'john', name: 'John Doe', grade: 'Grade A' },
    { id: 'jane', name: 'Jane Smith', grade: 'Grade B' },
    { id: 'mike', name: 'Mike Johnson', grade: 'Grade C' },
    { id: 'sarah', name: 'Sarah Wilson', grade: 'Grade D' },
    { id: 'ahmed', name: 'Ahmed Al-Rashid', grade: 'Grade E' }
  ];

  constructor(private fb: FormBuilder) {
    // this.employees = this.fb.array([]);
  }

  ngOnInit() {
    this.initializeForm();
    // Setup employee selection for the initial employee form
    this.setupEmployeeSelection();
  }


  changeRadio(){
    console.log('change1 '+ this.departmentForm.get('budgetName')?.value)
    console.log('change2 '+ this.userForm.get('budgetName')?.value)
  }

  setupEmployeeSelection() {
    // Setup employee selection for each employee form in the array
    this.employees.controls.forEach(employeeForm => {
      employeeForm.get('name')?.valueChanges.subscribe(selectedId => {
        if (selectedId) {
          const selectedEmployee = this.employeeOptions.find(emp => emp.id === selectedId);
          if (selectedEmployee) {
            employeeForm.patchValue({
              grade: selectedEmployee.grade
            });
          }
        } else {
          employeeForm.patchValue({
            grade: ''
          });
        }
      });
    });
  }

  initializeForm() {
    this.departmentForm = this.fb.group({
      selectedDepartment: [this.data.department.department, Validators.required],
      budgetName: [this.data.department.budgetName, Validators.required],
      selectedPolicy: [this.data.department.policy],
      budgetPeriod: [this.data.department.budgetPeriod, Validators.required],
      startDate: [this.data.department.startDate, Validators.required],
      endDate: [this.data.department.endDate, Validators.required],
      totalAmount: [this.data.department.totalAmount, [Validators.required, Validators.min(1)]],
      // employees: this.employees
    });
    this.userForm = this.fb.group({
      budgetName: [this.data.department.budgetName, Validators.required],
      selectedPolicy: [this.data.department.policy],
      budgetPeriod: [this.data.department.budgetPeriod, Validators.required],
      startDate: [this.data.department.startDate, Validators.required],
      endDate: [this.data.department.endDate, Validators.required],
      totalAmount: [this.data.department.totalAmount, [Validators.required, Validators.min(1)]],
      // employees: this.employees
    });
    this.newEmployeeForm=this.fb.group({
      employees: this.fb.array([this.data.employees||this.employee()]) // نبدأ بعنصر واحد
    });


  }
  employee(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      grade: [''],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }
  get employees(): FormArray {
    return this.newEmployeeForm.get('employees') as FormArray;
  }
  get employeesArray() {
    return this.departmentForm.get('employees') as FormArray;
  }

  // newEmployeeForm() {
  //   return this.fb.group({
  //     name: ['', Validators.required],
  //     grade: [''],
  //     amount: ['', [Validators.required, Validators.min(1)]]
  //   });
  // }

  cancelAddBudget() {
    console.log('Cancel clicked');
    this.departmentForm.reset();
    this.userForm.reset();
    this.newEmployeeForm.reset();
    this.employees.clear();
    this.initializeForm();
    this.cancelToParent.emit();
  }

  saveBudget() {
    if (this.departmentForm.valid&&this.newEmployeeForm.valid&&this.userForm.valid) {
      console.log('Save budget clicked');
      // console.log('dep data:', this.departmentForm.value);
      // console.log('user data:', this.userForm.value);
      // console.log('new:', this.newEmployeeForm.value);
      this.data={
        department:this.departmentForm.value,
        user: this.userForm.value,
        employees:this.newEmployeeForm.value
      }
      this.dataToParent.emit(this.data)
      console.log(this.data)
      // Implement save budget logic here
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  resetForm() {
    this.departmentForm.reset();
    // this.employees.clear();
    this.initializeForm();
  }

  addEmployee() {
    if (this.newEmployeeForm.valid) {


    const newEmployeeForm = this.employee();
    this.employees.push(newEmployeeForm);

    // Setup employee selection for the new form
    newEmployeeForm.get('name')?.valueChanges.subscribe(selectedId => {
      if (selectedId) {
        const selectedEmployee = this.employeeOptions.find(emp => emp.id === selectedId);
        if (selectedEmployee) {
          newEmployeeForm.patchValue({
            grade: selectedEmployee.grade
          });
        }
      } else {
        newEmployeeForm.patchValue({
          grade: ''
        });
      }
    });
  }
  }

  removeEmployee(index: number) {
    if (this.employees.length > 1) {
      this.employees.removeAt(index);
    }
  }

  private markFormGroupTouched(formGroup?: FormGroup) {
    const targetForm = formGroup || this.departmentForm;
    Object.keys(targetForm.controls).forEach(key => {
      const control = targetForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.departmentForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.departmentForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['min']) {
        return `${fieldName} must be greater than 0`;
      }
    }
    return '';
  }
}

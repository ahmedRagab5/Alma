import { Budget, Employee } from './../budget.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

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
  id:string=''
  departmentForm!: FormGroup;
  userForm!: FormGroup;
  newEmployeeForm!:FormGroup
  // employees: FormArray;
  numEmp:number[]=[0]
  isUpdate = false
  radio:FormControl=new FormControl('department')
  // Employee data
  employeeOptions = [
    { id: '1', name: 'John Doe', grade: 'Grade A' },
    { id: '2', name: 'Jane Smith', grade: 'Grade B' },
    { id: '3', name: 'Mike Johnson', grade: 'Grade C' },
    { id: '4', name: 'Sarah Wilson', grade: 'Grade D' },
    { id: '5', name: 'Ahmed Al-Rashid', grade: 'Grade E' },
    { id: '6', name: 'Fahad Abdullah', grade: 'Grade F', budget: 40000 },
    { id: '7', name: 'Ahmed Saeed', grade: 'Grade G', budget: 30000 },
    { id: '8', name: 'Sultan Faisal', grade: 'Grade h', budget: 15000 }
  ];

  constructor(private fb: FormBuilder) {
    // this.employees = this.fb.array([]);
  }

  ngOnInit() {
    this.initializeForm();
    // Setup employee selection for the initial employee form
    this.setupEmployeeSelection();
    console.log('data'+this.data)
  }


  changeRadio(){
    console.log('change1 '+ this.departmentForm.get('budgetName')?.value)
    console.log('change2 '+ this.userForm.get('budgetName')?.value)
  }

  setupEmployeeSelection() {
    // Setup employee selection for each employee form in the array
    this.employees.controls.forEach(employeeForm => {
      employeeForm.get('id')?.valueChanges.subscribe(selectedId => {
        if (selectedId) {
          const selectedEmployee = this.employeeOptions.find(emp => emp.id === selectedId);
          console.log(selectedEmployee)
          if (selectedEmployee) {
            employeeForm.patchValue({
              grade: selectedEmployee.grade,
              name:selectedEmployee.name
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
    const dept = this.data?.department || {}; // نحط object فاضي لو department مش موجودة
    const user = this.data?.user || {}; // نحط object فاضي لو department مش موجودة

    this.departmentForm = this.fb.group({
      department: [dept.department || '', Validators.required],
      budgetName: [dept.budgetName || '', Validators.required],
      policy: [dept.policy || ''],
      budgetPeriod: [dept.budgetPeriod || '', Validators.required],
      startDate: [dept.startDate || '', Validators.required],
      endDate: [dept.endDate || '', Validators.required],
      totalAmount: [dept.totalAmount ?? '', [Validators.required, Validators.min(1)]]
    });

    this.userForm = this.fb.group({
      budgetName: [user.budgetName || '', Validators.required],
      policy: [user.policy || ''],
      budgetPeriod: [user.budgetPeriod || '', Validators.required],
      startDate: [user.startDate || '', Validators.required],
      endDate: [user.endDate || '', Validators.required],
      totalAmount: [user.totalAmount ?? '', [Validators.required, Validators.min(1)]]
    });

    this.newEmployeeForm = this.fb.group({
      employees: this.fb.array(
        this.data?.employees?.length
          ? this.data.employees.map(emp => this.employee(emp))
          : [this.employee()]
      )
    });
  }

  employee(emp?: Employee): FormGroup {
    return this.fb.group({
      id: [emp?.id || '', Validators.required],
      name:[emp?.name || ''],
      grade: [emp?.grade || ''],
      budget: [emp?.budget || '', [Validators.required, Validators.min(1)]]
    });
  }
  get employees(): FormArray {
    return this.newEmployeeForm.get('employees') as FormArray;
  }
  // get employeesArray() {
  //   return this.departmentForm.get('employees') as FormArray;
  // }

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

      if (this.data!=null) {
        this.isUpdate=true
        this.id=this.data.id
      }
      else{
        this.id='b10'
      }
        console.log('Save budget clicked');
        // console.log('dep data:', this.departmentForm.value);
        // console.log('user data:', this.userForm.value);
        // console.log('new:', this.newEmployeeForm.value);
        console.log(this.newEmployeeForm.value.employees)
        this.data={
          id:this.id,
          department:{
            ...this.departmentForm.value,
            assignedBudget:this.isUpdate?this.data.department.assignedBudget:this.departmentForm.get('totalAmount')?.value,
            spendBudget:this.isUpdate?this.data.department.spendBudget:0,
            availableBudget:this.isUpdate?this.data.department.availableBudget:this.departmentForm.get('totalAmount')?.value
          },
          user:{
            ...this.userForm.value,
            assignedBudget:this.isUpdate?this.data.user.assignedBudget:this.userForm.get('totalAmount')?.value,
            spendBudget:this.isUpdate?this.data.user.spendBudget:0,
            availableBudget:this.isUpdate?this.data.user.availableBudget:this.userForm.get('totalAmount')?.value
          },
          employees:this.newEmployeeForm.value.employees

        }
        this.dataToParent.emit({update:this.isUpdate,data:this.data})
        // console.log({update:this.isUpdate,data:this.data})

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
    newEmployeeForm.get('id')?.valueChanges.subscribe(selectedId => {
      if (selectedId) {
        const selectedEmployee = this.employeeOptions.find(emp => emp.id === selectedId);
        if (selectedEmployee) {
          newEmployeeForm.patchValue({
            grade: selectedEmployee.grade,
            name:selectedEmployee.name
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

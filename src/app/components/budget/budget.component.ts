import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddBudgetComponent } from "./add-budget/add-budget.component";
import { DeptDetailsComponent } from "./dept-details/dept-details.component";

export interface Employee {
  id: string;
  name: string;
  grade: string;
  budget: number;
}

export interface SubBudget {
  department?: string;
  assignedBudget: number;
  spendBudget: number;
  availableBudget: number;
  budgetName: string;
  policy: string;
  budgetPeriod: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
}
export interface Budget{
  department:SubBudget;
  user:SubBudget;
  employees:Employee[];
}
@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, AddBudgetComponent, DeptDetailsComponent],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  activePage='dashboard'
  activeTab ='department' ;
  currentPage = 1;
  itemsPerPage = 7;
  searchTerm = '';
  timeFilter = 'Last 30 days';
  Math = Math;
  isAdd=true
  isAddBudget=false
  isDeptDetails=false
  selectedBudget: Budget | null = null
  maxValue:number=-1
  budgets: Budget[] = [
    {
      department:{
        department: 'admin',
        assignedBudget: 100000,
        spendBudget: 10000,
        availableBudget: 90000,
        budgetName: 'Executive Travel Budget',
        policy: 'policy1',
        budgetPeriod: 'monthly',
        startDate: '2025-06-30',
        endDate: '2025-07-31',
        totalAmount: 100000,
      },
      user:{
        assignedBudget: 100000,
        spendBudget: 10000,
        availableBudget: 90000,
        budgetName: 'Executive Travel Budget',
        policy: 'policy1',
        budgetPeriod: 'monthly',
        startDate: '2025-06-30',
        endDate: '2025-07-31',
        totalAmount: 100000,
      },
      employees: [
        { id: '1', name: 'Fahad Abdullah Saud', grade: 'F', budget: 40000 },
        { id: '2', name: 'Ahmed Saeed Mansoori', grade: 'F', budget: 30000 },
        { id: '3', name: 'Sultan Faisal Al Jaber', grade: 'F', budget: 15000 }
      ]
    },
    {
      department:{
        department: 'Finance',
        assignedBudget: 60000,
        spendBudget: 12000,
        availableBudget: 48000,
        budgetName: 'Finance Travel Budget',
        policy: 'Finance Policy',
        budgetPeriod: 'Quarterly',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        totalAmount: 60000,
      },
      user:{
        department: 'Finance',
        assignedBudget: 60000,
        spendBudget: 12000,
        availableBudget: 48000,
        budgetName: 'Finance Travel Budget',
        policy: 'Finance Policy',
        budgetPeriod: 'Quarterly',
        startDate: '2025-01-01',
        endDate: '2025-03-31',
        totalAmount: 60000,
      },
      employees: [
        { id: '4', name: 'Sarah Ahmed', grade: 'E', budget: 25000 },
        { id: '5', name: 'Mohammed Ali', grade: 'D', budget: 20000 }
      ]
    },
    {
      department:{
        department: 'Sales',
        assignedBudget: 75000,
        spendBudget: 3000,
        availableBudget: 72000,
        budgetName: 'Sales Travel Budget',
        policy: 'Sales Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 75000,
      },
      user:{
        department: 'Sales',
        assignedBudget: 75000,
        spendBudget: 3000,
        availableBudget: 72000,
        budgetName: 'Sales Travel Budget',
        policy: 'Sales Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 75000,
      },
      employees: [
        { id: '6', name: 'Ali Hassan', grade: 'C', budget: 30000 },
        { id: '7', name: 'Fatima Omar', grade: 'B', budget: 25000 }
      ]
    },
    {
      department:{
        department: 'Operations',
      assignedBudget: 40000,
      spendBudget: 2000,
      availableBudget: 38000,
      budgetName: 'Operations Budget',
      policy: 'Operations Policy',
      budgetPeriod: 'Monthly',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      totalAmount: 40000,
      },
      user:{
        department: 'Operations',
        assignedBudget: 40000,
        spendBudget: 2000,
        availableBudget: 38000,
        budgetName: 'Operations Budget',
        policy: 'Operations Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 40000,
      },
      employees: [
        { id: '8', name: 'Omar Khalid', grade: 'A', budget: 20000 }
      ]
    },
    {
      department:{
        department: 'Development',
        assignedBudget: 30000,
        spendBudget: 28000,
        availableBudget: 2000,
        budgetName: 'Dev Team Budget',
        policy: 'Development Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 30000,
      },
      user:{
        department: 'Development',
        assignedBudget: 30000,
        spendBudget: 28000,
        availableBudget: 2000,
        budgetName: 'Dev Team Budget',
        policy: 'Development Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 30000,
      },
      employees: [
        { id: '9', name: 'Ahmad Developer', grade: 'A', budget: 15000 },
        { id: '10', name: 'Sara Coder', grade: 'B', budget: 10000 }
      ]
    },
    {
      department:{
        department: 'HR',
        assignedBudget: 22000,
        spendBudget: 10000,
        availableBudget: 12000,
        budgetName: 'HR Travel Budget',
        policy: 'HR Policy',
        budgetPeriod: 'Monthly',
        startDate: '2025-06-01',
        endDate: '2025-06-30',
        totalAmount: 22000,
      },
      user:{
        department: 'HR',
      assignedBudget: 22000,
      spendBudget: 10000,
      availableBudget: 12000,
      budgetName: 'HR Travel Budget',
      policy: 'HR Policy',
      budgetPeriod: 'Monthly',
      startDate: '2025-06-01',
      endDate: '2025-06-30',
      totalAmount: 22000,
      },
      employees: [
        { id: '11', name: 'HR Manager', grade: 'C', budget: 12000 }
      ]
    }
  ];

  chartData = [
    { department: 'Admin', assigned: 100, spend: 10 },
    { department: 'Finance', assigned: 60, spend: 12 },
    { department: 'Sales', assigned: 75, spend: 3 },
    { department: 'Operations', assigned: 40, spend: 2 },
    { department: 'Development', assigned: 30, spend: 28 },
    { department: 'HR', assigned: 22, spend: 10 }
  ];

  ngOnInit() {
    // Initialize component
    if(this.budgets.length>0){
      this.isAdd=false
    }
    this.budgets.forEach(budget=>{
      const value=budget.department.assignedBudget
      if(value>this.maxValue){
        this.maxValue=value
      }
    })
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
  }

  onTimeFilterChange(event: any) {
    this.timeFilter = event.target.value;
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
  }

  get filteredBudgets() {
    return this.budgets.filter(budget =>
      budget.department.department?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedBudgets() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredBudgets.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredBudgets.length / this.itemsPerPage);
  }

  get pages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  formatCurrency(amount: number): string {
    return `SAR ${amount.toLocaleString('en-IN')}`;
  }

  createNewBudget() {
    console.log('Create new budget clicked');
    this.isAddBudget = true;
  }

  viewDetails(deptBudget: Budget) {
    console.log(`View details for ${deptBudget.department}`);
    this.selectedBudget = deptBudget;
    this.isDeptDetails = true;
  }
  addBudget(data:any){
    // { department: 'HR', assignedBudget: 22, spendBudget: 10,availableBudget:90  }
    // const newBudget= { department: data.department.budgetName, assignedBudget: data.department.totalAmount, spendBudget: 0,availableBudget: data.department.totalAmount }
    this.budgets.push(data)
    this.isAddBudget=false
    this.isAdd=false
  }

  cancelAddBudget() {
    this.isAddBudget = false;
  }

  backToBudget() {
    this.isDeptDetails = false;
    this.selectedBudget = null;
  }

  editBudget() {
    this.isDeptDetails = false;
    this.isAddBudget = true;
  }
}

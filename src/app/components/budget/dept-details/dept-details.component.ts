import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Budget, SubBudget } from '../budget.component';

interface Employee {
  id: string;
  name: string;
  grade: string;
  budget: number;
}

interface DepartmentBudget {
  department: string;
  budgetName: string;
  policy: string;
  budgetPeriod: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  employees: Employee[];
}

@Component({
  selector: 'app-dept-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dept-details.component.html',
  styleUrl: './dept-details.component.css'
})
export class DeptDetailsComponent implements OnInit {
  @Input() budgetData!: Budget;
  @Output() backToBudget = new EventEmitter<void>();
  @Output() editBudget = new EventEmitter<void>();

  ngOnInit() {
    // Initialize component
  }

  goBack() {
    this.backToBudget.emit();
  }

  onEditBudget() {
    this.editBudget.emit();
  }

  formatCurrency(amount: number): string {
    return `SAR ${amount.toLocaleString('en-IN')}`;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-Not set-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

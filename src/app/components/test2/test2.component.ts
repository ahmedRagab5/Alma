import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test2.component.html',
  styleUrl: './test2.component.css'
})
export class Test2Component {
  activeTab = 'tmc';
  showEntries = 10;
  searchTerm = '';
  currentPage = 1;
  totalEntries = 62;

  airlines = [
    { name: 'Etihad Airways', validFrom: '09-11-2022', expiresOn: '31-12-2025', codeCount: 12, status: 'Active' },
    { name: 'Gulf Air', validFrom: '16-08-2023', expiresOn: '15-03-2026', codeCount: 7, status: 'Active' },
    { name: 'Kuwait Airways', validFrom: '21-05-2024', expiresOn: '20-05-2026', codeCount: 3, status: 'Inactive' },
    { name: 'Egyptair', validFrom: '03-12-2025', expiresOn: '11-07-2026', codeCount: 15, status: 'Inactive' },
    { name: 'Philippine Airlines', validFrom: '14-07-2020', expiresOn: '04-09-2026', codeCount: 9, status: 'Active' },
    { name: 'Saudi Arabian Airlines', validFrom: '27-10-2023', expiresOn: '22-10-2026', codeCount: 31, status: 'Active' },
    { name: 'Turkish Airlines', validFrom: '05-01-2024', expiresOn: '09-12-2026', codeCount: 2, status: 'Inactive' },
    { name: 'Kuwait Airways', validFrom: '11-04-2024', expiresOn: '30-01-2027', codeCount: 5, status: 'Active' },
    { name: 'Kuwait Airways', validFrom: '29-09-2023', expiresOn: '18-02-2027', codeCount: 10, status: 'Active' },
    { name: 'Emirates', validFrom: '12-02-2024', expiresOn: '27-03-2027', codeCount: 18, status: 'Active' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'status-active' : 'status-inactive';
  }
}

import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
// Removed XLSX import to avoid SSR issues - using CSV instead

interface Employee {
  id: number;
  name: string;
  role: string;
  image: string;
  reportsTo?: number;
}

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent implements AfterViewInit {
  searchTerm: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  employees: Employee[] = [
    {
      id: 1,
      name: 'Nasser Saif Al Mazrouei',
      role: 'Admin',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Syed Salman',
      role: 'Operation',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      reportsTo: 1
    },
    {
      id: 3,
      name: 'Majid Hamad Al Muhairi',
      role: 'Sales',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      reportsTo: 1
    },
    {
      id: 4,
      name: 'Faisal Khalid Al Saud',
      role: 'Finance',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      reportsTo: 1
    },
    {
      id: 5,
      name: 'Omar Abdullah Al Farsi',
      role: 'Account Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      reportsTo: 1
    },
    {
      id: 6,
      name: 'Nasser Saif Al Mazrouei',
      role: 'Travel Desk',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      reportsTo: 1
    }
  ];

  get filteredEmployees(): Employee[] {
    if (!this.searchTerm) {
      return this.employees;
    }
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredSubordinates(): Employee[] {
    if (!this.searchTerm) {
      return this.subordinates;
    }
    const filtered = this.subordinates.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Center scroll after filtering
    this.scrollCenter()

    return filtered;
  }

  get topLevelEmployee(): Employee | undefined {
    return this.employees.find(emp => !emp.reportsTo);
  }

  get subordinates(): Employee[] {
    const topLevel = this.topLevelEmployee;
    if (!topLevel) return [];
    return this.employees.filter(emp => emp.reportsTo === topLevel.id);
  }

  ngAfterViewInit(): void {
    // Only run in browser environment (not during SSR)
    this.scrollCenter()
  }
  scrollCenter(){
    if (isPlatformBrowser(this.platformId)) {
      // Center the organizational chart horizontally
      const container = document.getElementById('subordinates');
      if (container) {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
      }
    }
  }
  onSearch(event: any): void {
    this.searchTerm = event.target.value;
  }

  highlightText(text: string, searchTerm: string): string {
    if (!searchTerm) {
      return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  onDownload(): void {
    // Only run in browser environment (not during SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.downloadCSV();
    }
  }

  private downloadCSV(): void {
    // Create CSV content that can be opened in Excel
    let csvContent = '\uFEFF'; // BOM for UTF-8
    csvContent += 'ID,Name,Role,Reports To,Level\n';

    // Add top level employee
    const topLevel = this.topLevelEmployee;
    if (topLevel) {
      csvContent += `${topLevel.id},"${topLevel.name}","${topLevel.role}","","Top Level"\n`;
    }

    // Add subordinates
    this.subordinates.forEach(emp => {
      const reportsTo = topLevel ? topLevel.name : '';
      csvContent += `${emp.id},"${emp.name}","${emp.role}","${reportsTo}","Subordinate"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }

  // private prepareExcelData(): any[] {
  //   const excelData: any[] = [];
  //   const topLevel = this.topLevelEmployee;

  //   // Add top level employee
  //   if (topLevel) {
  //     excelData.push({
  //       'ID': topLevel.id,
  //       'Name': topLevel.name,
  //       'Role': topLevel.role,
  //       'Reports To': '',
  //       'Level': 'Top Level'
  //     });
  //   }

  //   // Add subordinates
  //   this.subordinates.forEach(emp => {
  //     const reportsTo = topLevel ? topLevel.name : '';
  //     excelData.push({
  //       'ID': emp.id,
  //       'Name': emp.name,
  //       'Role': emp.role,
  //       'Reports To': reportsTo,
  //       'Level': 'Subordinate'
  //     });
  //   });

  //   return excelData;
  // }


}

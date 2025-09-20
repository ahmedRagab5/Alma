import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {
  @Output() dateRangeChange = new EventEmitter<{departure: Date, return: Date}>();

  departureDate: Date | null = null;
  returnDate: Date | null = null;

  currentMonth1 = new Date();
  currentMonth2 = new Date();

  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;

  isCalendarOpen = false;

  constructor() {
    // Set second month to next month
    this.currentMonth2.setMonth(this.currentMonth2.getMonth() + 1);
  }

  getDaysInMonth(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add empty days for padding
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(new Date(year, month, -i));
    }

    // Add actual days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  isInRange(date: Date): boolean {
    if (!this.selectedStartDate || !this.selectedEndDate) return false;
    return date >= this.selectedStartDate && date <= this.selectedEndDate;
  }

  isStartDate(date: Date): boolean {
    return this.selectedStartDate?.toDateString() === date.toDateString();
  }

  isEndDate(date: Date): boolean {
    return this.selectedEndDate?.toDateString() === date.toDateString();
  }

  selectDate(date: Date): void {
    if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
      this.selectedStartDate = date;
      this.selectedEndDate = null;
      this.returnDate = null;
      this.departureDate = date;
      // console.log(this. getFormattedDateRange(thisdepartureDate!))
    } else {
      if (date > this.selectedStartDate) {
        this.selectedEndDate = date;
        this.returnDate = date;
        this.dateRangeChange.emit({
          departure: this.selectedStartDate,
          return: date
        });
      } else {
        this.selectedStartDate = date;
        this.selectedEndDate = null;
        this.departureDate = date;
      }
    }
  }

  previousMonth(): void {

      this.currentMonth1.setMonth(this.currentMonth1.getMonth() - 1);

      this.currentMonth2.setMonth(this.currentMonth2.getMonth() - 1);

  }

  nextMonth(): void {

      this.currentMonth1.setMonth(this.currentMonth1.getMonth() + 1);

      this.currentMonth2.setMonth(this.currentMonth2.getMonth() + 1);

  }

  getMonthName(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  getFormattedDateRange(date:Date): string {
    if (date) {
      const formatDate = (date: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
      };
      return `${formatDate(date)}`;
    }
    return '';
  }
  getDay(date:Date){
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }
  trackByDate(index: number, date: Date): number {
    return date.getTime();
  }
}

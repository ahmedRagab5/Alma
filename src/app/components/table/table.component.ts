import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Budget, Employee } from '../budget/budget.component';
import { from } from 'rxjs';

interface filter{
  filterName:string,
  placeholder:string,
  options:string[]
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  currentPage = 1;
  itemsPerPage = 7;
  searchTerm = '';
  Math = Math;
  fromDate:any=''
  toDate:any=''
  // isAdd=true
  // isAddBudget=false
  // isDeptDetails=false
  // isEmpDetails=false
  // selectedBudget: Budget | null = null
  // selectedEmp: Employee | null = null
  // maxValue:number=-1


  @Input() data: any[] = []; // البيانات (صفوف)
  @Input() columns: { key: string, title: string }[] = []; // تعريف الأعمدة
  @Input() searchName:string=''
  @Input() dateName:string=''
  @Input() filters:any[]=[]

  // filtersValue:any[]=[]


  ngOnInit() {
    // Initialize component
    // if(this.data.length>0){
    //   this.isAdd=false
    // }

    // this.filters.forEach((f,i)=>this.filtersValue[i]="")
    // console.log(this.filtersValue)
    // this.budgets.forEach(budget=>{
    //   const value=budget.department.assignedBudget
    //   if(value>this.maxValue){
    //     this.maxValue=value
    //   }
    // })
  }

  // onSearchChange(event: any) {
  //   this.searchTerm = event.target.value;
  // }



  onItemsPerPageChange(event: any) {
    this.itemsPerPage = parseInt(event.target.value);
    this.currentPage = 1;
  }

  get filteredData() {
    var data=this.data.filter(item =>
     item[this.searchName].toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.filters.forEach((f)=>{
      data =data.filter(item=>item[f.filterName]==f.value || f.value=="")
    })
    var from:any=new Date(this.fromDate).getTime()
    var to:any=new Date(this.toDate).getTime()
    // console.log(this.getDate("14/5/2005"))
    if(from &&to && from<=to){
      data=data.filter(item=>this.getDate(item.TransactionDate)>=from && this.getDate(item.TransactionDate)<=to)
    }

    return data

  }

  sendData(){
    return {data:this.filteredData,columns:this.columns}
  }

  getDate(date:string){
    var a=date.split('/')
    var newdate= new Date(`${a[2]}/${a[1]}/${a[0]}`).getTime()
    return newdate
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
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



  // viewBudgetDetails(deptBudget: Budget) {
  //   console.log(`View details for ${deptBudget.department}`);
  //   this.selectedBudget = deptBudget;
  //   this.isDeptDetails = true;
  // }
  // viewEmpDetails(emp: Employee) {
  //   console.log(`View details for ${emp}`);
  //   this.selectedEmp = emp;
  //   this.isEmpDetails = true;
  // }



  // cancelAddBudget() {
  //   this.isAddBudget = false;
  // }

  // backToBudget() {
  //   this.isDeptDetails = false;
  //   this.selectedBudget = null;
  // }

  // editBudgetClick() {
  //   this.isDeptDetails = false;
  //   this.isAddBudget = true;
  // }
}

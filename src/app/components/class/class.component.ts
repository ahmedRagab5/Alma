import { Component } from '@angular/core';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {
  classes:string[]=["Economy/Premium Economy","Premium Economy","Business","First Class"]
  class:string=""
  isOpen:boolean=false



  selectClass(c:string){
    this.class=c
    this.isOpen=false
  }
}

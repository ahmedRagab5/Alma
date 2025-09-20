import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {
  email:any={}
  isOpen:boolean=false

  mySelf:any={
    name:"ahmed",
    email:'ahmed@gmail.com',
  }


  selectEmail(){
    this.email=this.mySelf
    this.isOpen=false
  }
}

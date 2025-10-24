import { Component } from '@angular/core';
import { AddBudgetComponent } from "../../components/budget/add-budget/add-budget.component";
import { ClassComponent } from "../../components/class/class.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AddBudgetComponent, ClassComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

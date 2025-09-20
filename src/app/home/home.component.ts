import { Component } from '@angular/core';
import { FromToComponent } from "../components/from-to/from-to.component";
import { DateComponent } from "../components/date/date.component";
import { ClassComponent } from "../components/class/class.component";
import { EmailComponent } from "../components/email/email.component";
// import { MapComponent } from '../components/map/map.component';
import { OlMapComponent } from "../components/ol-map/ol-map.component";
import { TreeComponent } from "../components/tree/tree.component";
import { ProfileComponent } from "../components/profile/profile.component";
import { Profile2Component } from "../components/profile2/profile2.component";
import { BudgetComponent } from "../components/budget/budget.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TreeComponent, ProfileComponent, Profile2Component, BudgetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

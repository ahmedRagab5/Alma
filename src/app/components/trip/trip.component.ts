import { Component } from '@angular/core';
import { NewTripComponent } from "./new-trip/new-trip.component";

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [NewTripComponent],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {

}

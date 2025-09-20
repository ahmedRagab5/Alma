import { Component, EventEmitter, Output } from '@angular/core';
import { City } from '../../../interfaces/city';
import { PlaceComponent } from "../place/place.component";

@Component({
  selector: 'app-to',
  standalone: true,
  imports: [PlaceComponent],
  templateUrl: './to.component.html',
  styleUrl: './to.component.css'
})
export class ToComponent {
  @Output() dataEvent = new EventEmitter<City>();
  cityTo:any={}
  receiveData(data: City) {
    // console.log('Received city data:', data);
    this.cityTo=data
    this.dataEvent.emit(data);
  }

}

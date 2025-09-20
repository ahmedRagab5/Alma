import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlaceComponent } from "../place/place.component";
import { City } from '../../../interfaces/city';

@Component({
  selector: 'app-from',
  standalone: true,
  imports: [PlaceComponent],
  templateUrl: './from.component.html',
  styleUrl: './from.component.css'
})
export class FromComponent {
  @Output() dataEvent = new EventEmitter<City>();
  @Input() dataFrom: any = '';
  // input = this.input<City[]>([]);
  cityFrom:any={}
  receiveData(data: City) {
    // console.log('Received city data:', data);
    this.cityFrom=data
    this.dataEvent.emit(data);
  }
}

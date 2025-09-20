import { Component } from '@angular/core';
import { PlaceComponent } from "./place/place.component";
import { City } from '../../interfaces/city';
import { FromComponent } from "./from/from.component";
import { ToComponent } from "./to/to.component";

@Component({
  selector: 'app-from-to',
  standalone: true,
  imports: [FromComponent, ToComponent, PlaceComponent],
  templateUrl: './from-to.component.html',
  styleUrl: './from-to.component.css'
})
export class FromToComponent {
  cityFrom:any={}

  cityTo:any={}
  isShift:boolean=false
  receiveFromData(data: City) {
    console.log('Received From city data:', data);
    this.cityFrom=data

  }
  receiveToData(data: City) {
    console.log('Receivedb To city data:', data);
    this.cityTo=data
  }

  change(isS: boolean) {
    this.isShift = isS;
  }

}

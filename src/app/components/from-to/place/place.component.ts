import { Component, EventEmitter, Input, input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { City } from '../../../interfaces/city';
import { Cipher } from 'crypto';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Console } from 'console';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent {
  @Output() dataEvent = new EventEmitter<City>();
  name = input<string>('');


  cities:City[]=[
    {cityCode:'DXB',cityName:'Dubai',countryName:'UAE',desc:'dubai international'},
    {cityCode:'JED',cityName:'Jeddah',countryName:'Saudi Arabia',desc:'King Abdulaziz International'},
    {cityCode:'RUH',cityName:'Riyadh',countryName:'Saudi Arabia',desc:'King Khalid International'},
    {cityCode:'CAI',cityName:'Cairo',countryName:'Egypt',desc:'Cairo International'},
    {cityCode:'IST',cityName:'Istanbul',countryName:'Turkey',desc:'Istanbul Airport'},
    {cityCode:'LHR',cityName:'London',countryName:'United Kingdom',desc:'Heathrow Airport'},
    {cityCode:'CDG',cityName:'Paris',countryName:'France',desc:'Charles de Gaulle Airport'},
    {cityCode:'FRA',cityName:'Frankfurt',countryName:'Germany',desc:'Frankfurt Airport'},
    {cityCode:'AMS',cityName:'Amsterdam',countryName:'Netherlands',desc:'Schiphol Airport'},
    {cityCode:'MAD',cityName:'Madrid',countryName:'Spain',desc:'Adolfo Suárez Madrid–Barajas'},
    {cityCode:'FCO',cityName:'Rome',countryName:'Italy',desc:'Leonardo da Vinci International'}
  ]

  city:City=this.cities[0]

  search:FormControl<string | null>=new FormControl('')
  filterCities:City[]=this.cities

  isShow:boolean=false

  change(){
    this.filterCities=this.cities.filter(c=>c.cityName.toLowerCase().startsWith((this.search.value)?.toLocaleLowerCase()||''))
  }
  select(c:City){
    this.isShow=false
    this.city=c
    this.search.setValue('')
    this.dataEvent.emit(c);

  }
  click(){
    this.isShow=!this.isShow;
    this.search.setValue('');
    this.filterCities=this.cities
  }
}

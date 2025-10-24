import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  @Input() trip: TripCardData = {
    type: 'flight',
    badge: 'New Trip',
    menuIcon: 'more_vert',
    transportLabel: 'Flight',
    carrier: 'Saudia',
    logoUrl: null,
    fromCity: 'Jeddah',
    fromCode: 'JED',
    toCity: 'Dubai',
    toCode: 'DXB',
    requesterName: 'Razia Khan',
    requesterCountLabel: '+ 1',
    requesterRole: 'Employee',
    tripId: '108080',
    tripName: 'Dubai',
    costCenter: 'Facility',
    requestedOn: 'Fri, 20 Jun 2025',
    departureOn: 'Sun, 22 Jun 2025',
    fareClass: 'Business',
    priceAmount: 2309,
    priceCurrency: 'SAR',
    policyNote: 'In Policy: Razia Khan is sending a trip request to you for flight booking, you are able to accept or reject the request with valid reason.'
  };
}

export interface TripCardData {
  type: 'flight' | 'hotel' | 'car' | 'visa' | 'insurance' | 'package' | 'cruise' | 'data' | 'activity';
  badge: string;
  menuIcon: string;
  transportLabel: string;
  carrier: string;
  logoUrl: string | null;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  requesterName: string;
  requesterCountLabel?: string;
  requesterRole: string;
  tripId: string | number;
  tripName: string;
  costCenter: string;
  requestedOn: string;
  departureOn: string;
  fareClass: string;
  priceAmount: number;
  priceCurrency: string;
  policyNote: string;

  // Optional fields per type
  location?: string;           // hotel
  checkIn?: string;            // hotel
  checkOut?: string;           // hotel

  rentalType?: string;         // car
  pickupOn?: string;           // car
  dropoffOn?: string;          // car

  visaType?: string;           // visa
  visaStatus?: string;         // visa

  insuranceType?: string;      // insurance
  sessionType?: string;        // insurance
  planType?: string;           // insurance

  nights?: string | number;    // package
  returnOn?: string;           // package

  // Cruise
  departArrivalOn?: string;    // cruise

  // Data/SIM plan
  planCategory?: string;       // data (Local/International)
  dataType?: string;           // data (e.g., Data Only)

  // Activity/Excursion
  address?: string;            // activity
}


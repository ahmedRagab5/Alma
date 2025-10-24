import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent, TripCardData } from "../shared/trip-card/trip-card.component";

@Component({
  selector: 'app-new-trip',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './new-trip.component.html',
  styleUrl: './new-trip.component.css'
})
export class NewTripComponent {
  trips: TripCardData[] = [
    {
      type: 'flight',
      badge: 'New Trip',
      menuIcon: 'more_vert',
      transportLabel: 'Flight',
      carrier: 'Saudia',
      logoUrl: 'assets/download.jpeg',
      fromCity: 'Jeddah', fromCode: 'JED',
      toCity: 'Dubai', toCode: 'DXB',
      requesterName: 'Razia Khan', requesterCountLabel: '+ 1', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Dubai', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025',
      fareClass: 'Business',
      priceAmount: 2309, priceCurrency: 'SAR',
      policyNote: 'In Policy: Razia Khan is sending a trip request to you for flight booking, you are able to accept or reject the request with valid reason.'
    },
    {
      type: 'hotel',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Hotel', carrier: 'Hyatt Place Riyadh', logoUrl: 'assets/download.jpeg',
      fromCity: 'Riyadh', fromCode: 'RUH', toCity: 'Riyadh', toCode: 'RUH',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Hyatt Place Riyadh Al Sulaimani', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      location: 'Riyadh', checkIn: 'Fri, 20 Jun 2025', checkOut: 'Sun, 22 Jun 2025',
      priceAmount: 548, priceCurrency: 'SAR', policyNote: 'Delightful stay. You can accept or reject.'
    },
    {
      type: 'car',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Car Rental', carrier: 'Premium (Toyota Innova)', logoUrl: 'assets/download.jpeg',
      fromCity: 'King Khalid Airport', fromCode: 'RUH', toCity: 'Riyadh', toCode: 'RUH',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Car Rental', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      rentalType: 'Self Drive', pickupOn: 'Fri, 20 Jun 2025', dropoffOn: 'Sun, 22 Jun 2025',
      priceAmount: 199, priceCurrency: 'SAR', policyNote: 'Pickup from airport. You can accept or reject.'
    },
    {
      type: 'visa',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Visa', carrier: 'Saudi Arabia', logoUrl: 'assets/download.jpeg',
      fromCity: 'Riyadh', fromCode: 'RUH', toCity: 'Dubai', toCode: 'DXB',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Visa Saudi Arabia', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      visaType: 'eVisa', visaStatus: 'In-Process',
      priceAmount: 149, priceCurrency: 'SAR', policyNote: 'Visa processing in progress.'
    },
    {
      type: 'insurance',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Insurance', carrier: 'Arabia Insurance', logoUrl: 'assets/download.jpeg',
      fromCity: 'Dubai', fromCode: 'DXB', toCity: 'Riyadh', toCode: 'RUH',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Insurance: Arabia Insurance', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      planType: 'Individual', sessionType: 'Annual', insuranceType: 'Travel',
      priceAmount: 99, priceCurrency: 'SAR', policyNote: 'Insurance plan details.'
    },
    {
      type: 'package',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Package', carrier: 'Singapore Honeymoon', logoUrl: 'assets/download.jpeg',
      fromCity: 'Singapore', fromCode: 'SIN', toCity: 'Singapore', toCode: 'SIN',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Singapore Honeymoon in Luxury', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      nights: '7 Nights', returnOn: 'Sun, 22 Jun 2025',
      priceAmount: 3475, priceCurrency: 'SAR', policyNote: 'Romantic package.'
    },
    {
      type: 'cruise',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Cruise', carrier: 'Icon of the Seas', logoUrl: 'assets/download.jpeg',
      fromCity: 'Miami', fromCode: 'MIA', toCity: 'Caribbean', toCode: 'CRB',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: '7 Nights Eastern Caribbean', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sat, 28 Jun 2025', fareClass: '-',
      departArrivalOn: '10 Oct - 17 Oct 2026',
      priceAmount: 396, priceCurrency: 'SAR', policyNote: 'Enjoy your cruise.'
    },
    {
      type: 'data',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'France', carrier: 'Liberation Mobile', logoUrl: 'assets/download.jpeg',
      fromCity: 'France', fromCode: 'FRA', toCity: 'France', toCode: 'FRA',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'France Trip', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Sun, 22 Jun 2025', fareClass: '-',
      planCategory: 'Local', dataType: 'Data Only',
      priceAmount: 307, priceCurrency: 'SAR', policyNote: 'Data plan details.'
    },
    {
      type: 'activity',
      badge: 'New Trip', menuIcon: 'more_vert', transportLabel: 'Riyadh: Edge of the World', carrier: 'With 4x4 vehicles, sunset Dinner and stargazing', logoUrl: 'assets/download.jpeg',
      fromCity: 'Riyadh', fromCode: 'RUH', toCity: 'Riyadh', toCode: 'RUH',
      requesterName: 'Razia Khan', requesterRole: 'Employee',
      tripId: '108080', tripName: 'Florida Trip', costCenter: 'Facility',
      requestedOn: 'Fri, 20 Jun 2025', departureOn: 'Thu, 31 Jul 2025', fareClass: '-',
      address: 'Oasis Metro Station Parking Area, King Salman, Al Raed, Riyadh 12354, Saudi Arabia',
      priceAmount: 182, priceCurrency: 'SAR', policyNote: 'Excursion details.'
    }
  ];
}

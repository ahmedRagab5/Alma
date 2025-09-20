// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import * as L from 'leaflet';
// import 'leaflet.markercluster';
// import { Booking, BookingCluster } from '../../interfaces/booking';

// // Extend Leaflet types for marker cluster
// declare module 'leaflet' {
//   namespace MarkerClusterGroup {
//     interface Options {
//       iconCreateFunction?: (cluster: any) => L.DivIcon;
//     }
//   }
// }

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './map.component.html',
//   styleUrl: './map.component.css'
// })
// export class MapComponent implements OnInit, OnDestroy {
//   private map: L.Map | undefined;
//   private markerClusterGroup: any;

//   // Filter properties
//   travelDates = ['All Dates', 'This Week', 'This Month', 'Next 3 Months'];
//   corporates = ['All Corporates', 'Tech Corp', 'Finance Inc', 'Travel Co'];
//   selectedTravelDate = 'All Dates';
//   selectedCorporate = 'All Corporates';
//   searchName = '';

//   // Sample booking data
//   bookings: Booking[] = [
//     {
//       id: '1',
//       name: 'John Smith',
//       location: { lat: 64.1466, lng: -21.9426, city: 'Reykjavik', country: 'Iceland' },
//       travelDate: '2024-01-15',
//       corporate: 'Tech Corp',
//       avatar: 'https://i.pravatar.cc/40?img=1',
//       status: 'ongoing'
//     },
//     {
//       id: '2',
//       name: 'Erik Johnson',
//       location: { lat: 60.1699, lng: 24.9384, city: 'Helsinki', country: 'Finland' },
//       travelDate: '2024-01-20',
//       corporate: 'Finance Inc',
//       avatar: 'https://i.pravatar.cc/40?img=2',
//       status: 'upcoming'
//     },
//     {
//       id: '3',
//       name: 'Ahmed Hassan',
//       location: { lat: 4.1755, lng: 73.5093, city: 'Malé', country: 'Maldives' },
//       travelDate: '2024-01-25',
//       corporate: 'Travel Co',
//       avatar: 'https://i.pravatar.cc/40?img=3',
//       status: 'ongoing'
//     },
//     {
//       id: '4',
//       name: 'Sarah Wilson',
//       location: { lat: 71.7069, lng: -42.6043, city: 'Nuuk', country: 'Greenland' },
//       travelDate: '2024-01-18',
//       corporate: 'Tech Corp',
//       status: 'ongoing'
//     },
//     {
//       id: '5',
//       name: 'Carlos Rodriguez',
//       location: { lat: 23.1136, lng: -82.3666, city: 'Havana', country: 'Cuba' },
//       travelDate: '2024-01-22',
//       corporate: 'Finance Inc',
//       status: 'upcoming'
//     },
//     {
//       id: '6',
//       name: 'Maria Garcia',
//       location: { lat: 40.4168, lng: -3.7038, city: 'Madrid', country: 'Spain' },
//       travelDate: '2024-01-28',
//       corporate: 'Travel Co',
//       status: 'ongoing'
//     }
//   ];

//   filteredBookings: Booking[] = [];

//   ngOnInit() {
//     this.filteredBookings = [...this.bookings];
//     this.fixLeafletIcons();
//     this.initMap();
//   }

//   private fixLeafletIcons() {
//     // Fix for Leaflet default markers
//     const iconRetinaUrl = 'assets/marker-icon-2x.png';
//     const iconUrl = 'assets/marker-icon.png';
//     const shadowUrl = 'assets/marker-shadow.png';
//     const iconDefault = L.icon({
//       iconRetinaUrl,
//       iconUrl,
//       shadowUrl,
//       iconSize: [25, 41],
//       iconAnchor: [12, 41],
//       popupAnchor: [1, -34],
//       tooltipAnchor: [16, -28],
//       shadowSize: [41, 41]
//     });
//     L.Marker.prototype.options.icon = iconDefault;
//   }

//   ngOnDestroy() {
//     if (this.map) {
//       this.map.remove();
//     }
//   }

//   private initMap() {
//     // Initialize the map
//     this.map = L.map('map').setView([20, 0], 2);

//     // Add tile layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '© OpenStreetMap contributors'
//     }).addTo(this.map);

//     // Initialize marker cluster group
//     this.markerClusterGroup = (L as any).markerClusterGroup({
//       chunkedLoading: true,
//       maxClusterRadius: 50,
//       iconCreateFunction: (cluster: any) => {
//         const count = cluster.getChildCount();
//         return L.divIcon({
//           html: `<div class="cluster-marker">${count}</div>`,
//           className: 'custom-cluster',
//           iconSize: [40, 40]
//         });
//       }
//     });

//     this.map.addLayer(this.markerClusterGroup);
//     this.updateMapMarkers();
//   }

//   private updateMapMarkers() {
//     if (!this.markerClusterGroup) return;

//     // Clear existing markers
//     this.markerClusterGroup.clearLayers();

//     // Add individual booking markers
//     this.filteredBookings.forEach(booking => {
//       const marker = L.marker([booking.location.lat, booking.location.lng], {
//         icon: L.divIcon({
//           html: `<div class="booking-marker">
//             <img src="${booking.avatar || 'https://i.pravatar.cc/40?img=0'}" alt="${booking.name}" />
//           </div>`,
//           className: 'custom-booking-marker',
//           iconSize: [32, 32]
//         })
//       });

//       marker.bindPopup(`
//         <div class="booking-popup">
//           <h3>${booking.name}</h3>
//           <p><strong>Location:</strong> ${booking.location.city}, ${booking.location.country}</p>
//           <p><strong>Travel Date:</strong> ${booking.travelDate}</p>
//           <p><strong>Corporate:</strong> ${booking.corporate}</p>
//           <p><strong>Status:</strong> <span class="status-${booking.status}">${booking.status}</span></p>
//         </div>
//       `);

//       this.markerClusterGroup.addLayer(marker);
//     });
//   }

//   onSearch() {
//     this.filteredBookings = this.bookings.filter(booking => {
//       const matchesName = this.searchName === '' ||
//         booking.name.toLowerCase().includes(this.searchName.toLowerCase());
//       const matchesCorporate = this.selectedCorporate === 'All Corporates' ||
//         booking.corporate === this.selectedCorporate;

//       return matchesName && matchesCorporate;
//     });

//     this.updateMapMarkers();
//   }

//   onFilterChange() {
//     this.onSearch();
//   }

//   zoomIn() {
//     if (this.map) {
//       this.map.zoomIn();
//     }
//   }

//   zoomOut() {
//     if (this.map) {
//       this.map.zoomOut();
//     }
//   }

//   getZoomLevel(): number {
//     if (this.map) {
//       return Math.round(this.map.getZoom() * 14); // Convert zoom level to percentage
//     }
//     return 28; // Default zoom level
//   }
// }

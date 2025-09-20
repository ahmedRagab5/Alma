export interface Booking {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    country: string;
  };
  travelDate: string;
  corporate: string;
  avatar?: string;
  status: 'ongoing' | 'upcoming';
}

export interface BookingCluster {
  lat: number;
  lng: number;
  count: number;
  bookings: Booking[];
}

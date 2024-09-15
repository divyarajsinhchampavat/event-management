export interface Event {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    totalGuests?: number;
    images: any[] | null ;
  }
  
  export interface User {
    id: number;
    username: string;
    // Add other user fields as necessary
  }
  
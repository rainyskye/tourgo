export interface Location {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    phoneNumber?: string;
    address?: string;
    promotions?: string[];
  }
  
  export const customLocations: Location[] = [
    {
      id: 1,
      name: "Torrens University",
      description: "GovHack 2024 Venue",
      lat: -34.928009,
      lng: 138.604004,
      phoneNumber: "1300 575 803",
      //address: "88 Wakefield St, Adelaide SA 5000",
      promotions: ["Cool Things???", "GovHack Venue!"]
    },
    // Add more locations...
  ];
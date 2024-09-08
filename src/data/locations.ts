export interface Location {
    id: string;
    name: string;
    lat: number;
    lng: number;
    description?: string;
  }
  
  export const customLocations: Location[] = [
    {
      id: '1',
      name: 'Torrens University',
      lat: -34.928009,
      lng: 138.604004,
      description: 'GovHack Adelaide Venue'
    },
  ];
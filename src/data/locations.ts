export interface Location {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
    phoneNumber?: string;
    address?: string;
    link?: string;
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
      address: "88 Wakefield St, Adelaide SA 5000",
      promotions: ["Cool Things???", "GovHack Venue!"]
    },
    {
      id: 2,
      name: "Litchfield National Park",
      description: "Feel yourself unwind as you float in lush waterholes with misty waterfalls nestled among dramatic landscapes.",
      lat: -12.752340,
      lng: 130.897040,
      phoneNumber: "(08) 8999 4555",
      address: "XW5F+VX Litchfield Park, Litchfield Park, Northern Territory, 0822, Australia",
      link: "https://nt.gov.au/parks/find-a-park/litchfield-national-park",
      //promotions: ["Cool Things???", "GovHack Venue!"]
    },
    {
      id: 2,
      name: "Litchfield National Park",
      description: "Feel yourself unwind as you float in lush waterholes with misty waterfalls nestled among dramatic landscapes.",
      lat: -12.752340,
      lng: 130.897040,
      phoneNumber: "(08) 8999 4555",
      address: "XW5F+VX Litchfield Park, Litchfield Park, Northern Territory, 0822, Australia",
      link: "https://nt.gov.au/parks/find-a-park/litchfield-national-park",
      //promotions: ["Cool Things???", "GovHack Venue!"]
    },
    // Add more locations...
  ];
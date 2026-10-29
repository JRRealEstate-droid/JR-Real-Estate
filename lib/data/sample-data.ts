export interface SampleProperty {
  id: string;
  referenceId: string;
  slug: string;
  title: string;
  description: string;
  transactionType: 'BUY' | 'RENT' | 'LEASE';
  category: 'PLOT_LAND' | 'FLAT_APARTMENT' | 'VILLA_HOUSE' | 'COMMERCIAL_SHOP' | 'COMMERCIAL_OFFICE' | 'AGRICULTURAL_LAND' | 'WAREHOUSE';
  status: 'PUBLISHED' | 'DRAFT' | 'UNDER_REVIEW' | 'SOLD' | 'RENTED' | 'ARCHIVED';
  localityName: string;
  localitySlug: string;
  address: string;
  landmark?: string;
  price: number;
  priceDisplay: string;
  isPriceNegotiable: boolean;
  carpetArea?: number;
  builtUpArea?: number;
  plotArea?: number;
  areaUnit: string;
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  floorNumber?: number;
  totalFloors?: number;
  facing?: string;
  furnishingStatus?: 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED';
  possessionStatus?: 'READY_TO_MOVE' | 'UNDER_CONSTRUCTION' | 'RESALE' | 'NEW_LAUNCH';
  verified: boolean;
  featured: boolean;
  images: { url: string; altText: string; isPrimary: boolean }[];
  amenities: string[];
  isSampleData: boolean;
  createdAt: string;
}

export const SAMPLE_PROPERTIES: SampleProperty[] = [
  {
    id: 'prop-sample-01',
    referenceId: 'JR-PLT-101',
    slug: 'vda-approved-residential-plot-pandeypur-chauraha-jr-plt-101',
    title: 'VDA Layout Residential Plot near Pandeypur Chauraha',
    description: 'Prime rectangular residential plot situated in an established colony just 400m from Pandeypur Chauraha. Featuring a wide 30-feet paved frontage, direct municipal water line connection, and immediate registry-ready freehold status. Ideal for constructing a multi-storey family residence or rental apartment floor.',
    transactionType: 'BUY',
    category: 'PLOT_LAND',
    status: 'PUBLISHED',
    localityName: 'Pandeypur Chauraha',
    localitySlug: 'pandeypur-chauraha',
    address: 'Near Premchand Park, Pandeypur Chauraha, Varanasi',
    landmark: 'Behind SBI Pandeypur Branch',
    price: 4800000,
    priceDisplay: '₹ 48 Lakh',
    isPriceNegotiable: true,
    plotArea: 1360,
    areaUnit: 'sq.ft',
    facing: 'East Facing',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: true,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        altText: 'Residential plot land in prime Varanasi location',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80',
        altText: 'Connecting wide road in residential colony',
        isPrimary: false,
      },
    ],
    amenities: ['30ft Wide Road', 'Gated Colony', 'Municipal Water Supply', 'Electricity Pole Installed', 'Immediate Registry'],
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'prop-sample-02',
    referenceId: 'JR-APT-102',
    slug: 'modern-3-bhk-luxury-apartment-sigra-jr-apt-102',
    title: '3 BHK Modern Luxury Apartment with Covered Parking in Sigra',
    description: 'Spacious high-rise 3 BHK flat located in one of Varanasi’s most central and well-connected neighborhoods. Designed with cross-ventilation, two wide balconies overlooking city greens, modular kitchen, branded bathroom fittings, dedicated basement car parking, and 24x7 security monitoring.',
    transactionType: 'BUY',
    category: 'FLAT_APARTMENT',
    status: 'PUBLISHED',
    localityName: 'Sigra',
    localitySlug: 'sigra',
    address: 'Near Vidyapeeth Road, Sigra, Varanasi',
    landmark: '5 mins from Sigra Stadium',
    price: 8500000,
    priceDisplay: '₹ 85 Lakh',
    isPriceNegotiable: false,
    carpetArea: 1350,
    builtUpArea: 1680,
    areaUnit: 'sq.ft',
    bedrooms: 3,
    bathrooms: 2,
    balconies: 2,
    floorNumber: 4,
    totalFloors: 9,
    facing: 'North-East',
    furnishingStatus: 'SEMI_FURNISHED',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: true,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        altText: 'Modern 3 BHK apartment building facade',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        altText: 'Spacious living room and dining area',
        isPrimary: false,
      },
      {
        url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
        altText: 'Contemporary kitchen with premium fittings',
        isPrimary: false,
      },
    ],
    amenities: ['Automatic Lift', 'Covered Car Parking', 'Power Backup', '24x7 Security Guard', 'Intercom', 'Fire Fighting System'],
    createdAt: '2026-01-20T11:30:00Z',
  },
  {
    id: 'prop-sample-03',
    referenceId: 'JR-VIL-103',
    slug: 'independent-duplex-kothi-villa-shivpur-jr-vil-103',
    title: 'Newly Built Independent 4 BHK Duplex Villa in Shivpur',
    description: 'Elegantly crafted 4 BHK independent duplex house on a 1500 sq.ft plot in a peaceful residential colony off Shivpur Bypass. Ground floor features spacious double-height hall, guest bedroom, modular kitchen and portico parking. First floor includes 3 master bedrooms with attached baths and open terrace.',
    transactionType: 'BUY',
    category: 'VILLA_HOUSE',
    status: 'PUBLISHED',
    localityName: 'Shivpur',
    localitySlug: 'shivpur',
    address: 'Tarna - Shivpur Road, Varanasi',
    landmark: 'Close to Central Jail Road junction',
    price: 12500000,
    priceDisplay: '₹ 1.25 Cr',
    isPriceNegotiable: true,
    carpetArea: 2200,
    builtUpArea: 2650,
    plotArea: 1500,
    areaUnit: 'sq.ft',
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    floorNumber: 1,
    totalFloors: 2,
    facing: 'North Facing',
    furnishingStatus: 'SEMI_FURNISHED',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: true,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        altText: 'Independent luxury duplex villa elevation',
        isPrimary: true,
      },
      {
        url: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
        altText: 'Interior double height living hall',
        isPrimary: false,
      },
    ],
    amenities: ['Private Car Porch', 'Terrace Garden Area', 'Borewell & Submersible', 'Modular Kitchen', 'Designer False Ceiling', 'CCTV Provision'],
    createdAt: '2026-01-22T09:15:00Z',
  },
  {
    id: 'prop-sample-04',
    referenceId: 'JR-SHP-104',
    slug: 'prime-corner-commercial-shop-orderly-bazar-jr-shp-104',
    title: 'High-Footfall Main Road Commercial Shop in Orderly Bazar',
    description: 'Ground-floor corner retail commercial shop situated on main Orderly Bazar market road. Highly suitable for pathology lab, branded retail outlet, clinic, salon, or retail pharmacy. Features front rolling shutter with glass facade, tile flooring, and dedicated electrical meter.',
    transactionType: 'BUY',
    category: 'COMMERCIAL_SHOP',
    status: 'PUBLISHED',
    localityName: 'Orderly Bazar',
    localitySlug: 'orderly-bazar',
    address: 'Near District Court Road, Orderly Bazar, Varanasi',
    landmark: 'Opposite Popular Medical Stores',
    price: 6200000,
    priceDisplay: '₹ 62 Lakh',
    isPriceNegotiable: true,
    carpetArea: 380,
    builtUpArea: 420,
    areaUnit: 'sq.ft',
    floorNumber: 0,
    totalFloors: 3,
    facing: 'West Facing',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: false,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        altText: 'Prime commercial street shop front',
        isPrimary: true,
      },
    ],
    amenities: ['Glass Display Front', '3-Phase Electric Connection', 'Main Road Visibility', 'Public Parking Nearby'],
    createdAt: '2026-01-24T14:20:00Z',
  },
  {
    id: 'prop-sample-05',
    referenceId: 'JR-RNT-105',
    slug: 'spacious-2-bhk-furnished-flat-mahmoorganj-jr-rnt-105',
    title: 'Well-Ventilated 2 BHK Flat for Rent in Mahmoorganj',
    description: 'Peaceful 2 BHK family flat available for rent in prime residential pocket of Mahmoorganj. Semi-furnished with wardrobes in both bedrooms, geysers, modular kitchen cabinets, and lift access. Walking distance to schools, markets, and hospitals.',
    transactionType: 'RENT',
    category: 'FLAT_APARTMENT',
    status: 'PUBLISHED',
    localityName: 'Mahmoorganj',
    localitySlug: 'mahmoorganj',
    address: 'Lane No. 3, Mahmoorganj, Varanasi',
    landmark: 'Near Akashvani Kendra',
    price: 18000,
    priceDisplay: '₹ 18,000 / month',
    isPriceNegotiable: false,
    carpetArea: 950,
    builtUpArea: 1150,
    areaUnit: 'sq.ft',
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    floorNumber: 2,
    totalFloors: 5,
    facing: 'East Facing',
    furnishingStatus: 'SEMI_FURNISHED',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: false,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
        altText: 'Well lit rental apartment living space',
        isPrimary: true,
      },
    ],
    amenities: ['Lift', 'Dedicated Bike & Car Parking', '24x7 Water Supply', 'Wardrobes Installed', 'Security Guard'],
    createdAt: '2026-01-25T16:00:00Z',
  },
  {
    id: 'prop-sample-06',
    referenceId: 'JR-PLT-106',
    slug: 'investment-plot-babatpur-airport-road-jr-plt-106',
    title: 'Gated Township Residential Plot on Babatpur Airport Highway',
    description: 'High-appreciation investment plot located just 10 minutes from Lal Bahadur Shastri International Airport on the 4-lane Highway corridor. Gated layout with demarcated corner boundary, wide concrete internal roads, street lights, and drainage infrastructure.',
    transactionType: 'BUY',
    category: 'PLOT_LAND',
    status: 'PUBLISHED',
    localityName: 'Babatpur (Airport Road)',
    localitySlug: 'babatpur-airport-road',
    address: 'NH-31 Airport Expressway, Varanasi',
    landmark: 'Near Airport Flyover exit',
    price: 3200000,
    priceDisplay: '₹ 32 Lakh',
    isPriceNegotiable: true,
    plotArea: 1200,
    areaUnit: 'sq.ft',
    facing: 'North Facing',
    possessionStatus: 'READY_TO_MOVE',
    verified: false,
    featured: true,
    isSampleData: true,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        altText: 'Wide road planned township plot in Varanasi',
        isPrimary: true,
      },
    ],
    amenities: ['40ft Main Entry Road', 'Gated Community with Guard Room', 'Street Lights', 'Underground Drainage', 'Solar Street Lighting'],
    createdAt: '2026-01-28T09:00:00Z',
  },
];

export interface SampleProject {
  id: string;
  referenceId: string;
  slug: string;
  title: string;
  builderName: string;
  reraNumber?: string;
  localityName: string;
  address: string;
  status: 'UPCOMING' | 'UNDER_CONSTRUCTION' | 'READY_TO_MOVE' | 'COMPLETED';
  minPrice?: number;
  maxPrice?: number;
  priceRangeDisplay?: string;
  completionDate?: string;
  description: string;
  highlights: string[];
  images: { url: string; caption?: string }[];
  isSampleData: boolean;
}

export const SAMPLE_PROJECTS: SampleProject[] = [
  {
    id: 'prj-sample-01',
    referenceId: 'JR-PRJ-01',
    slug: 'kashi-greens-enclave-paharia',
    title: 'Kashi Greens Luxury Enclave',
    builderName: 'JR Real Estate & Builders',
    reraNumber: 'UPRERAPRJ-PENDING-OWNER-CONFIRMATION',
    localityName: 'Paharia',
    address: 'Ring Road Phase-1 Junction, Paharia, Varanasi',
    status: 'UNDER_CONSTRUCTION',
    minPrice: 5500000,
    maxPrice: 11000000,
    priceRangeDisplay: '₹ 55 Lakh - ₹ 1.10 Cr',
    completionDate: 'December 2027',
    description: 'A planned 4-acre residential community offering 2 & 3 BHK luxury residences along with premium commercial frontage on Ring Road. Features 60% open landscaped spaces, modern clubhouse, and children play zone.',
    highlights: ['60% Open Area', 'Clubhouse with Gym & Community Hall', 'Earthquake Resistant RCC', 'VDA Masterplan Aligned'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
        caption: 'Architectural 3D render of residential towers',
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Clubhouse and landscaped park view',
      },
    ],
    isSampleData: true,
  },
  {
    id: 'prj-sample-02',
    referenceId: 'JR-PRJ-02',
    slug: 'ganga-view-heights-sarnath',
    title: 'Ganga View Heights',
    builderName: 'JR Builders Varanasi',
    reraNumber: 'UPRERAPRJ-PENDING-OWNER-CONFIRMATION',
    localityName: 'Sarnath',
    address: 'Near Sarnath Archaeological Park, Varanasi',
    status: 'UPCOMING',
    minPrice: 4200000,
    maxPrice: 8800000,
    priceRangeDisplay: '₹ 42 Lakh - ₹ 88 Lakh',
    completionDate: 'Mid 2028',
    description: 'Serene and peaceful residential apartments in Sarnath heritage corridor. Low density living with panoramic terrace views and modern lifestyle amenities.',
    highlights: ['Heritage Belt Calm Environment', 'Rainwater Harvesting', 'Vastu Compliant Design', 'Solar Backed Common Areas'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        caption: 'Low-rise boutique apartment elevation',
      },
    ],
    isSampleData: true,
  },
];

export const SAMPLE_FAQS = [
  {
    category: 'BUYING',
    question: 'What documents are required to purchase a plot or flat in Varanasi?',
    answer: 'Standard document checklist includes: Identity proof (Aadhaar & PAN), Address proof, 12 to 30 years Title Search Report / Khatauni extract, Encumbrance Certificate (Barah Sala), Non-encumbrance certificate, Approved map copy if applicable, and Registry stamp duty calculation based on current DM circle rates.',
  },
  {
    category: 'BUYING',
    question: 'How are Circle Rates determined in Varanasi (UP)?',
    answer: 'The District Magistrate (DM) office revises circle rates periodically based on ward, road width (e.g. 20ft, 30ft, 40ft+), and commercial vs residential zone. JR Real Estate assists buyers with official circle rate calculations and accurate stamp duty estimation prior to token payment.',
  },
  {
    category: 'CONSTRUCTION',
    question: 'What is included in JR Real Estate’s turnkey home construction package?',
    answer: 'Our turnkey packages cover end-to-end execution: structural soil testing, architectural 2D floor plans & 3D elevations, foundation excavation, RCC frame work with certified branded steel (Tata Tiscon / Jindal), brickwork, plaster, concealed electrical & plumbing, waterproofing, tiles/marble flooring, doors, windows, paint, and final finishing with scheduled milestone inspections.',
  },
  {
    category: 'LEGAL',
    question: 'Do you help with Property Mutation (Dakhil Kharij) in Varanasi?',
    answer: 'Yes. Post-registry, our legal liaison team assists property buyers with Tehsil mutation (Dakhil Kharij) in the official revenue records (Khasra/Khatauni) as well as municipal corporation (Nagar Nigam) tax assessment transfer.',
  },
  {
    category: 'CONSTRUCTION',
    question: 'Can I visit ongoing construction sites before signing a construction contract?',
    answer: 'Absolutely. We encourage prospective home builders to visit our active sites in Pandeypur, Shivpur, and Paharia to inspect raw material quality, RCC curing standards, and discuss build progress with our site engineers.',
  },
];

export const SAMPLE_BLOGS = [
  {
    slug: 'varanasi-real-estate-investment-guide-2025-2026',
    title: 'Top 5 Real Estate Growth Corridors in Varanasi for 2025–2026',
    excerpt: 'Detailed analysis of Babatpur Airport Road, Shivpur bypass, Ring Road Phase-1, and Pandeypur expansion corridors for high capital appreciation.',
    author: 'JR Research Team',
    publishedAt: '2026-01-10',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    category: 'Market Trends',
    content: `Varanasi is experiencing historic infrastructure modernization. With the operational Ring Road, 4-lane Airport Expressway, Ropeway project, and expansion of trade corridors, real estate growth is rapidly shifting along high-connectivity nodes.

### 1. Babatpur - Airport Highway Corridor
Connecting the city to Lal Bahadur Shastri International Airport, this corridor has seen rapid plotted development and institutional projects. High potential for commercial land and township plots.

### 2. Pandeypur to Paharia & Ring Road Junction
Centrally located with vibrant markets and established hospitals, Pandeypur remains the commercial anchor of North Varanasi. Plots and independent homes in adjacent colonies are in perpetual demand.

### 3. Shivpur Bypass
Shivpur offers excellent road connectivity to Cantt Railway Station and highway networks, making it a favorite for residential kothis and budget-friendly apartment complexes.`,
  },
  {
    slug: 'house-construction-guide-varanasi-soil-costs-materials',
    title: 'Complete Guide to Building Your House in Varanasi: Soil, Materials & Costs',
    excerpt: 'Key considerations for RCC foundations, Ganga alluvial soil conditions, monsoon waterproofing, and estimated per-sq.ft construction costs.',
    author: 'Er. Umesh Yadav & Team',
    publishedAt: '2026-01-18',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
    category: 'Construction Guide',
    content: `Constructing a durable, multi-generational home in Varanasi requires understanding local soil dynamics and climatic conditions.

### Foundation Engineering
Varanasi’s alluvial soil necessitates rigorous footing design. Isolated column footings or combined raft foundations depending on the number of floors (G+1 vs G+3) ensure seismic safety and prevent differential settlement.

### Key Material Selection
- **TMT Rebars:** Always use Fe-550 or Fe-550D grade steel with embossed batch certification.
- **Waterproofing:** Anti-efflorescence chemical treatment (shora protection) is critical for local ground moisture.
- **Bricks:** High-density kiln-baked No. 1 red bricks or AAC blocks for upper floors to reduce dead load.`,
  },
];

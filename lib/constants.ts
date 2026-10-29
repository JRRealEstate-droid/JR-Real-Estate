export const BRAND = {
  name: 'JR Real Estate Varanasi',
  shortName: 'JR Real Estate',
  director: 'Mr. Umesh Yadav',
  phone: '8948301111',
  phoneFormatted: '+91 89483 01111',
  whatsappNumber: '918948301111',
  email: 'contact@jrrealestate.in',
  address: 'S9/90A, Pandeypur Chauraha, Varanasi, UP, 221002',
  tagline: 'Your Dream Home, Our Responsibility',
  website: 'https://jrrealestate.in',
  officeHours: 'Mon - Sun: 9:30 AM - 8:00 PM',
  heroHeadline: 'Find Your Dream Property in Varanasi',
  heroSubheadline: 'Property, Construction & Real Estate Solutions — All Under One Roof.',
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Buy', href: '/buy' },
  { name: 'Rent', href: '/rent' },
  { name: 'Sell', href: '/sell' },
  { name: 'Projects', href: '/projects' },
  { name: 'Construction', href: '/construction' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const PROPERTY_CATEGORIES = [
  { id: 'PLOT_LAND', name: 'Plots & Land', icon: 'MapPin', description: 'VDA approved & free-hold plots across prime Varanasi growth corridors' },
  { id: 'FLAT_APARTMENT', name: 'Flats & Apartments', icon: 'Building2', description: '2, 3 & 4 BHK apartments in gated societies with modern amenities' },
  { id: 'VILLA_HOUSE', name: 'Villas & Independent Houses', icon: 'Home', description: 'Duplex and luxury independent houses with private terrace & parking' },
  { id: 'COMMERCIAL_SHOP', name: 'Commercial Shops & Showrooms', icon: 'Store', description: 'High-footfall commercial spaces in central Varanasi market areas' },
  { id: 'COMMERCIAL_OFFICE', name: 'Commercial Offices', icon: 'Briefcase', description: 'Ready-to-move and bare-shell corporate office spaces' },
  { id: 'AGRICULTURAL_LAND', name: 'Agricultural Land', icon: 'Trees', description: 'Farming and investment land parcels along emerging bypass corridors' },
  { id: 'WAREHOUSE', name: 'Warehouses & Godowns', icon: 'Warehouse', description: 'Logistics and storage spaces near Varanasi transport hubs' },
];

export const VARANASI_LOCALITIES = [
  { name: 'Pandeypur Chauraha', slug: 'pandeypur-chauraha', pincode: '221002', tag: 'Prime Central' },
  { name: 'Shivpur', slug: 'shivpur', pincode: '221003', tag: 'High Growth' },
  { name: 'Sigra', slug: 'sigra', pincode: '221010', tag: 'Commercial Hub' },
  { name: 'Paharia', slug: 'paharia', pincode: '221007', tag: 'Residential Corridors' },
  { name: 'Orderly Bazar', slug: 'orderly-bazar', pincode: '221002', tag: 'Central City' },
  { name: 'Sarnath', slug: 'sarnath', pincode: '221007', tag: 'Heritage & Calm' },
  { name: 'Mahmoorganj', slug: 'mahmoorganj', pincode: '221010', tag: 'Premium Residential' },
  { name: 'Nadesar', slug: 'nadesar', pincode: '221002', tag: 'Cantonment Area' },
  { name: 'Lanka (BHU Area)', slug: 'lanka-bhu', pincode: '221005', tag: 'Institutional & Retail' },
  { name: 'Rohania (NH-19)', slug: 'rohania', pincode: '221108', tag: 'Fast Developing Corridor' },
  { name: 'Babatpur (Airport Road)', slug: 'babatpur-airport-road', pincode: '221006', tag: 'Expressway Growth' },
  { name: 'Ashapur', slug: 'ashapur', pincode: '221007', tag: 'VDA Zone' },
];

export const BUDGET_RANGES_BUY = [
  { label: 'Under ₹ 30 Lakh', min: 0, max: 3000000 },
  { label: '₹ 30 Lakh - ₹ 60 Lakh', min: 3000000, max: 6000000 },
  { label: '₹ 60 Lakh - ₹ 1 Crore', min: 6000000, max: 10000000 },
  { label: '₹ 1 Crore - ₹ 2 Crore', min: 10000000, max: 20000000 },
  { label: 'Above ₹ 2 Crore', min: 20000000, max: null },
];

export const BUDGET_RANGES_RENT = [
  { label: 'Under ₹ 10,000 / mo', min: 0, max: 10000 },
  { label: '₹ 10,000 - ₹ 25,000 / mo', min: 10000, max: 25000 },
  { label: '₹ 25,000 - ₹ 50,000 / mo', min: 25000, max: 50000 },
  { label: 'Above ₹ 50,000 / mo', min: 50000, max: null },
];

export const CONSTRUCTION_PACKAGES = [
  {
    name: 'Standard Package',
    code: 'STANDARD',
    ratePerSqFt: 1550,
    headline: 'Reliable & Quality Structure',
    description: 'Perfect for economical, durable residential building with trusted branded materials.',
    specifications: [
      'Structure: RCC frame with Tata Tiscon / Jindal Panther FE-550 TMT Steel',
      'Cement: Ultratech / ACC / Ambuja 43/53 grade',
      'Bricks: First-class traditional red clay bricks or high-density AAC blocks',
      'Flooring: 2x2 double charged vitrified tiles (Kajaria / Somany)',
      'Electrical: Finolex / Havells concealed copper wiring with modular switches',
      'Plumbing & Sanitary: Astral / Supreme CPVC pipes with Cera / Parryware fittings',
      'Paint: Asian Paints Tractor Emulsion interior & Apex exterior weather-proof',
    ],
  },
  {
    name: 'Premium Package',
    code: 'PREMIUM',
    ratePerSqFt: 1950,
    popular: true,
    headline: 'Modern Elegance & High-End Comfort',
    description: 'Our most popular choice for Varanasi home-owners seeking designer finishes and luxury fixtures.',
    specifications: [
      'Structure: Earthquake-resistant RCC frame with Tata Tiscon FE-550D TMT',
      'Cement: Ultratech Super / ACC Gold',
      'Flooring: 4x2 premium glazed vitrified tiles / Italian marble touch in living room',
      'Bathrooms: Jaquar / Kohler luxury fixtures & concealed cisterns',
      'Woodwork: Teak wood main door frame with designer flush door & Godrej locks',
      'Windows: UPVC 3-track sliding windows with mosquito mesh (Fenesta style)',
      'Electrical: Schneider / Legrand modular switches, AC copper piping pre-laid',
      'Paint: Asian Paints Royale luxury interior & Apex Ultima exterior',
    ],
  },
  {
    name: 'Luxury / Turnkey Elite',
    code: 'LUXURY',
    ratePerSqFt: 2500,
    headline: 'Bespoke Architectural Masterpiece',
    description: 'End-to-end turnkey construction including 3D elevation, false ceilings, modular kitchen, and smart automation.',
    specifications: [
      'Architectural & 3D Structural design by certified structural engineers',
      'Imported marble or large-format 6x4 tiles in main areas',
      'Complete modular kitchen with acrylic finish & chimney/hob provision',
      'False ceiling with warm LED profile lighting in all rooms',
      'Kohler / Grohe premium thermostatic bathroom fittings with glass cubicle',
      'Smart home automation provision: video door phone, motorized gate wiring',
      'Solar net metering conduit and rainwater harvesting setup',
    ],
  },
];


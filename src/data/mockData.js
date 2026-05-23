export const AVAILABLE_LANGUAGES = [
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' }
];

export const INDIAN_CITIES = [
  'Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Bengaluru',
  'Chennai', 'Mumbai', 'Delhi', 'Kolkata'
];

export const HOTELS = [
  {
    id: 1,
    name: 'Grand Palace Hotel',
    location: 'Vijayawada',
    price: 3500,
    rating: 4.5,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    staffLanguages: ['te', 'en', 'hi'],
    amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Gym'],
    rooms: ['Deluxe', 'Suite', 'Standard'],
    type: 'hotel'
  },
  {
    id: 2,
    name: 'Coastal Beach Resort',
    location: 'Visakhapatnam',
    price: 4200,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop',
    staffLanguages: ['te', 'en'],
    amenities: ['Beach Access', 'Pool', 'Restaurant', 'Bar', 'Water Sports'],
    rooms: ['Beach Villa', 'Premium', 'Standard'],
    type: 'hotel'
  },
  {
    id: 3,
    name: 'City Center Inn',
    location: 'Hyderabad',
    price: 2800,
    rating: 4.2,
    reviews: 456,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
    staffLanguages: ['te', 'hi', 'en', 'ur'],
    amenities: ['Restaurant', 'Free WiFi', 'Business Center', 'Parking'],
    rooms: ['Executive', 'Standard', 'Economy'],
    type: 'hotel'
  },
  {
    id: 4,
    name: 'Tech Park Hotel',
    location: 'Bengaluru',
    price: 5500,
    rating: 4.6,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop',
    staffLanguages: ['kn', 'en', 'hi', 'ta'],
    amenities: ['Pool', 'Gym', 'Restaurant', 'Co-working', 'Free WiFi'],
    rooms: ['Business Suite', 'Deluxe', 'Standard'],
    type: 'hotel'
  },
  {
    id: 5,
    name: 'Heritage Haveli',
    location: 'Hyderabad',
    price: 3200,
    rating: 4.4,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
    staffLanguages: ['ur', 'hi', 'te', 'en'],
    amenities: ['Restaurant', 'Heritage Tour', 'Free WiFi', 'Parking'],
    rooms: ['Royal Suite', 'Heritage', 'Standard'],
    type: 'hotel'
  },
  {
    id: 6,
    name: 'Marina Bay Hotel',
    location: 'Chennai',
    price: 3800,
    rating: 4.3,
    reviews: 278,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop',
    staffLanguages: ['ta', 'en', 'te'],
    amenities: ['Beach View', 'Restaurant', 'Pool', 'Free WiFi'],
    rooms: ['Sea Facing', 'Deluxe', 'Standard'],
    type: 'hotel'
  },
  {
    id: 7,
    name: 'Lakeside Retreat',
    location: 'Bengaluru',
    price: 4800,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400&h=300&fit=crop',
    staffLanguages: ['kn', 'en', 'ml', 'hi'],
    amenities: ['Lake View', 'Spa', 'Restaurant', 'Yoga', 'Pool'],
    rooms: ['Lake Suite', 'Premium', 'Standard'],
    type: 'hotel'
  },
  {
    id: 8,
    name: 'Metro Lodge',
    location: 'Mumbai',
    price: 2500,
    rating: 3.9,
    reviews: 523,
    image: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?w=400&h=300&fit=crop',
    staffLanguages: ['mr', 'hi', 'en', 'gu'],
    amenities: ['Restaurant', 'Free WiFi', 'Parking'],
    rooms: ['Standard', 'Economy'],
    type: 'hotel'
  }
];

export const DRIVERS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    vehicle: 'Toyota Innova',
    vehicleType: 'SUV',
    plateNumber: 'AP 16 XY 1234',
    price: 2000,
    priceUnit: 'per day',
    rating: 4.6,
    rides: 1234,
    languages: ['te', 'en', 'hi'],
    available: true,
    location: 'Vijayawada',
    type: 'driver'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    vehicle: 'Honda City',
    vehicleType: 'Sedan',
    plateNumber: 'AP 13 AB 5678',
    price: 1500,
    priceUnit: 'per day',
    rating: 4.8,
    rides: 2341,
    languages: ['te', 'en'],
    available: true,
    location: 'Visakhapatnam',
    type: 'driver'
  },
  {
    id: 3,
    name: 'Mohammed Ali',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    vehicle: 'Hyundai Creta',
    vehicleType: 'Compact SUV',
    plateNumber: 'TS 07 CD 9012',
    price: 1800,
    priceUnit: 'per day',
    rating: 4.5,
    rides: 1876,
    languages: ['ur', 'hi', 'te', 'en'],
    available: true,
    location: 'Hyderabad',
    type: 'driver'
  },
  {
    id: 4,
    name: 'Suresh Reddy',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    vehicle: 'Mahindra XUV700',
    vehicleType: 'SUV',
    plateNumber: 'KA 05 EF 3456',
    price: 2500,
    priceUnit: 'per day',
    rating: 4.7,
    rides: 3421,
    languages: ['te', 'kn', 'en', 'hi'],
    available: true,
    location: 'Bengaluru',
    type: 'driver'
  },
  {
    id: 5,
    name: 'Ananya Gupta',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    vehicle: 'Maruti Swift',
    vehicleType: 'Hatchback',
    plateNumber: 'TN 01 GH 7890',
    price: 1200,
    priceUnit: 'per day',
    rating: 4.4,
    rides: 2156,
    languages: ['ta', 'en', 'te'],
    available: true,
    location: 'Chennai',
    type: 'driver'
  },
  {
    id: 6,
    name: 'Vikram Patil',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    vehicle: 'Toyota Camry',
    vehicleType: 'Luxury Sedan',
    plateNumber: 'MH 02 IJ 1234',
    price: 3500,
    priceUnit: 'per day',
    rating: 4.9,
    rides: 876,
    languages: ['mr', 'hi', 'en', 'gu'],
    available: true,
    location: 'Mumbai',
    type: 'driver'
  },
  {
    id: 7,
    name: 'Lakshmi Devi',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    vehicle: 'Honda Amaze',
    vehicleType: 'Compact Sedan',
    plateNumber: 'AP 19 KL 5678',
    price: 1400,
    priceUnit: 'per day',
    rating: 4.3,
    rides: 1654,
    languages: ['te', 'en'],
    available: true,
    location: 'Vijayawada',
    type: 'driver'
  },
  {
    id: 8,
    name: 'Arjun Nair',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    vehicle: 'Kia Seltos',
    vehicleType: 'Compact SUV',
    plateNumber: 'KL 07 MN 9012',
    price: 1900,
    priceUnit: 'per day',
    rating: 4.5,
    rides: 987,
    languages: ['ml', 'en', 'ta', 'hi'],
    available: true,
    location: 'Bengaluru',
    type: 'driver'
  }
];

export const MANAGER_TEAMS = {
  hotel: {
    name: 'Hotel Staff',
    members: [
      { id: 1, name: 'Reception Team', languages: ['en', 'hi', 'te'], memberCount: 4 },
      { id: 2, name: 'Housekeeping', languages: ['te', 'hi'], memberCount: 6 },
      { id: 3, name: 'Restaurant Staff', languages: ['en', 'hi', 'te', 'ur'], memberCount: 5 },
      { id: 4, name: 'Concierge', languages: ['en', 'hi', 'te', 'kn'], memberCount: 2 }
    ]
  },
  transport: {
    name: 'Driver Fleet',
    members: [
      { id: 1, name: 'Morning Shift Drivers', languages: ['te', 'en', 'hi'], memberCount: 8 },
      { id: 2, name: 'Evening Shift Drivers', languages: ['te', 'en', 'ur'], memberCount: 6 },
      { id: 3, name: 'Night Shift Drivers', languages: ['hi', 'en', 'kn'], memberCount: 4 }
    ]
  }
};

export function calculateMatchScore(userLanguages, providerLanguages) {
  if (!userLanguages.length || !providerLanguages.length) return 0;
  const matched = userLanguages.filter(l => providerLanguages.includes(l));
  return (matched.length / Math.max(userLanguages.length, providerLanguages.length)) * 100;
}

export function filterByLanguage(items, userLanguages, type = 'hotel') {
  const langKey = type === 'hotel' ? 'staffLanguages' : 'languages';
  return items.map(item => ({
    ...item,
    matchScore: calculateMatchScore(userLanguages, item[langKey]),
    matchedLanguages: userLanguages.filter(l => item[langKey].includes(l))
  })).sort((a, b) => b.matchScore - a.matchScore);
}

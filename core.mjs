// Seeded demo data and pure helpers for the Meridian travel booking prototype.
// Everything here is sample content. No live supplier or payment API is called.

export const destinations = [
  {
    id: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    region: "Europe",
    flightFrom: 612,
    photo:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80",
    blurb: "Tiled streets, Atlantic light and pastries still warm at noon."
  },
  {
    id: "kyoto",
    city: "Kyoto",
    country: "Japan",
    region: "Asia",
    flightFrom: 1084,
    photo:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    blurb: "Quiet gardens, wooden lanes and a temple around every corner."
  },
  {
    id: "amalfi",
    city: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    flightFrom: 164,
    photo:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    blurb: "Cliffside villages, lemon groves and a very blue sea."
  },
  {
    id: "marrakech",
    city: "Marrakech",
    country: "Morocco",
    region: "Africa",
    flightFrom: 734,
    photo:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1200&q=80",
    blurb: "Courtyard riads, spice markets and warm evenings."
  },
  {
    id: "reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    flightFrom: 389,
    photo:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1200&q=80",
    blurb: "Lava fields, hot springs and long summer light."
  },
  {
    id: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    region: "Africa",
    flightFrom: 1142,
    photo:
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1200&q=80",
    blurb: "A mountain in the middle of a city and two oceans nearby."
  }
];

export const stays = [
  {
    id: "casa-do-mar",
    cityId: "lisbon",
    name: "Casa do Mar",
    area: "Príncipe Real",
    nightly: 168,
    score: 4.9,
    details: "1 bedroom · sleeps 2 · balcony",
    perks: ["Free cancellation", "Breakfast included"],
    photo:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "alfama-loft",
    cityId: "lisbon",
    name: "Alfama Loft",
    area: "Alfama",
    nightly: 142,
    score: 4.7,
    details: "Studio · sleeps 2 · rooftop",
    perks: ["Free cancellation", "Self check-in"],
    photo:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "tejo-house",
    cityId: "lisbon",
    name: "Tejo House",
    area: "Cais do Sodré",
    nightly: 196,
    score: 4.8,
    details: "2 bedrooms · sleeps 4 · river view",
    perks: ["Free cancellation", "Family friendly"],
    photo:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "machiya-ko",
    cityId: "kyoto",
    name: "Machiya Kō",
    area: "Higashiyama",
    nightly: 214,
    score: 4.9,
    details: "1 bedroom · sleeps 2 · garden",
    perks: ["Free cancellation", "Tea service"],
    photo:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "gion-studio",
    cityId: "kyoto",
    name: "Gion Studio",
    area: "Gion",
    nightly: 188,
    score: 4.6,
    details: "Studio · sleeps 2 · tatami room",
    perks: ["Free cancellation", "Self check-in"],
    photo:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "villa-bianca",
    cityId: "amalfi",
    name: "Villa Bianca",
    area: "Praiano",
    nightly: 245,
    score: 4.9,
    details: "1 bedroom · sleeps 2 · sea view",
    perks: ["Free cancellation", "Breakfast included"],
    photo:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "limone-rooms",
    cityId: "amalfi",
    name: "Limone Rooms",
    area: "Amalfi town",
    nightly: 198,
    score: 4.7,
    details: "1 bedroom · sleeps 2 · terrace",
    perks: ["Free cancellation", "Beach nearby"],
    photo:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "riad-azul",
    cityId: "marrakech",
    name: "Riad Azul",
    area: "Medina",
    nightly: 132,
    score: 4.8,
    details: "1 bedroom · sleeps 2 · courtyard",
    perks: ["Free cancellation", "Breakfast included"],
    photo:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "palm-courtyard",
    cityId: "marrakech",
    name: "Palm Courtyard",
    area: "Hivernage",
    nightly: 158,
    score: 4.6,
    details: "2 bedrooms · sleeps 4 · pool",
    perks: ["Free cancellation", "Family friendly"],
    photo:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lava-studio",
    cityId: "reykjavik",
    name: "Lava Studio",
    area: "Laugavegur",
    nightly: 189,
    score: 4.7,
    details: "Studio · sleeps 2 · kitchenette",
    perks: ["Free cancellation", "Self check-in"],
    photo:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "harbour-light",
    cityId: "reykjavik",
    name: "Harbour Light",
    area: "Old Harbour",
    nightly: 172,
    score: 4.5,
    details: "1 bedroom · sleeps 2 · harbour view",
    perks: ["Free cancellation", "Breakfast included"],
    photo:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "harbour-house",
    cityId: "cape-town",
    name: "Harbour House",
    area: "V&A Waterfront",
    nightly: 146,
    score: 4.8,
    details: "1 bedroom · sleeps 2 · mountain view",
    perks: ["Free cancellation", "Breakfast included"],
    photo:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "kloof-cottage",
    cityId: "cape-town",
    name: "Kloof Cottage",
    area: "Kloof Street",
    nightly: 164,
    score: 4.6,
    details: "1 bedroom · sleeps 2 · garden",
    perks: ["Free cancellation", "Self check-in"],
    photo:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
  }
];

export const flights = [
  {
    id: "tp-lis",
    cityId: "lisbon",
    airline: "TAP Air Portugal",
    code: "TP",
    flightNo: "TP 202",
    fromCode: "JFK",
    toCode: "LIS",
    fromCity: "New York",
    toCity: "Lisbon",
    depart: "20:40",
    arrive: "08:30",
    nextDay: true,
    duration: "6h 50m",
    stops: "Nonstop",
    price: 612,
    fare: "Carry-on included"
  },
  {
    id: "tpm-lis",
    cityId: "lisbon",
    airline: "TAP Air Portugal",
    code: "TP",
    flightNo: "TP 208",
    fromCode: "EWR",
    toCode: "LIS",
    fromCity: "Newark",
    toCity: "Lisbon",
    depart: "22:10",
    arrive: "10:05",
    nextDay: true,
    duration: "6h 55m",
    stops: "Nonstop",
    price: 578,
    fare: "Carry-on included"
  },
  {
    id: "nh-tyo",
    cityId: "kyoto",
    airline: "ANA",
    code: "NH",
    flightNo: "NH 109",
    fromCode: "JFK",
    toCode: "HND",
    fromCity: "New York",
    toCity: "Tokyo",
    depart: "11:15",
    arrive: "15:25",
    nextDay: true,
    duration: "14h 10m",
    stops: "1 stop",
    price: 1084,
    fare: "2 checked bags"
  },
  {
    id: "ba-nap",
    cityId: "amalfi",
    airline: "British Airways",
    code: "BA",
    flightNo: "BA 532",
    fromCode: "LHR",
    toCode: "NAP",
    fromCity: "London",
    toCity: "Naples",
    depart: "08:05",
    arrive: "11:55",
    nextDay: false,
    duration: "2h 50m",
    stops: "Nonstop",
    price: 164,
    fare: "Carry-on included"
  },
  {
    id: "at-rak",
    cityId: "marrakech",
    airline: "Royal Air Maroc",
    code: "AT",
    flightNo: "AT 201",
    fromCode: "JFK",
    toCode: "RAK",
    fromCity: "New York",
    toCity: "Marrakech",
    depart: "19:30",
    arrive: "13:20",
    nextDay: true,
    duration: "11h 50m",
    stops: "1 stop",
    price: 734,
    fare: "1 checked bag"
  },
  {
    id: "fi-rek",
    cityId: "reykjavik",
    airline: "Icelandair",
    code: "FI",
    flightNo: "FI 630",
    fromCode: "BOS",
    toCode: "KEF",
    fromCity: "Boston",
    toCity: "Reykjavik",
    depart: "21:25",
    arrive: "06:35",
    nextDay: true,
    duration: "5h 10m",
    stops: "Nonstop",
    price: 389,
    fare: "Carry-on included"
  },
  {
    id: "dl-cpt",
    cityId: "cape-town",
    airline: "Delta",
    code: "DL",
    flightNo: "DL 232",
    fromCode: "JFK",
    toCode: "CPT",
    fromCity: "New York",
    toCity: "Cape Town",
    depart: "18:45",
    arrive: "16:10",
    nextDay: true,
    duration: "17h 25m",
    stops: "1 stop",
    price: 1142,
    fare: "2 checked bags"
  }
];

export const tripLengthOptions = [
  { value: 3, label: "3 nights" },
  { value: 4, label: "4 nights" },
  { value: 5, label: "5 nights" },
  { value: 7, label: "7 nights" }
];

export function formatMoney(value, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(Number(value) || 0);
}

export function formatDate(isoDate) {
  const date = new Date(`${isoDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function nightsBetween(checkIn, checkOut) {
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const nights = Math.round((end - start) / 86400000);
  return Number.isFinite(nights) && nights > 0 ? nights : 0;
}

export function searchStays(cityId = "any") {
  return cityId === "any" ? [...stays] : stays.filter((stay) => stay.cityId === cityId);
}

export function searchFlights(cityId = "any") {
  return cityId === "any" ? [...flights] : flights.filter((flight) => flight.cityId === cityId);
}

export function getDestination(cityId) {
  return destinations.find((destination) => destination.id === cityId) || null;
}

export function getStay(stayId) {
  return stays.find((stay) => stay.id === stayId) || null;
}

export function getFlight(flightId) {
  return flights.find((flight) => flight.id === flightId) || null;
}

export function formatCardNumber(value) {
  const digits = String(value).replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function luhnValid(value) {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 15 || digits.length > 16) return false;
  let sum = 0;
  let double = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}

export function validatePayment(payment, today = new Date()) {
  const errors = {};
  if (!String(payment.name || "").trim() || String(payment.name).trim().length < 2) {
    errors.name = "Enter the name shown on the card.";
  }
  if (!luhnValid(payment.number)) {
    errors.number = "Use a valid demo card number.";
  }
  const expiry = String(payment.expiry || "").match(/^(\d{2})\s*\/\s*(\d{2})$/);
  if (!expiry) {
    errors.expiry = "Use MM/YY.";
  } else {
    const month = Number(expiry[1]);
    const year = 2000 + Number(expiry[2]);
    const endOfMonth = new Date(year, month, 1);
    if (month < 1 || month > 12 || endOfMonth <= today) {
      errors.expiry = "Use a future expiry date.";
    }
  }
  if (!/^\d{3,4}$/.test(String(payment.cvc || ""))) {
    errors.cvc = "Use 3 or 4 digits.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateTraveler(traveler) {
  const errors = {};
  if (!String(traveler.firstName || "").trim()) errors.firstName = "Enter a first name.";
  if (!String(traveler.lastName || "").trim()) errors.lastName = "Enter a last name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(traveler.email || "").trim())) {
    errors.email = "Enter a valid email.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

export function makeBookingReference(seed = Date.now()) {
  let value = Math.abs(Number(seed) || 1) % 2176782336;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 6; index += 1) {
    code += alphabet[value % alphabet.length];
    value = Math.floor(value / alphabet.length);
  }
  return `MRD-${code}`;
}

export function assistantReply(input) {
  const text = String(input || "").toLowerCase();
  if (/(human|agent|person|call)/.test(text)) {
    return "I can hand this to a human agent. In production this opens a live chat or creates a ticket with the trip reference. This demo has no live agent connected.";
  }
  if (/(beach|sea|warm|coast)/.test(text)) {
    return "For warm water and an easy flight, start with Lisbon or Cape Town. Lisbon stays start at $142 a night and Cape Town at $146. Open Destinations to compare both.";
  }
  if (/(japan|kyoto|tokyo|spring)/.test(text)) {
    return "Kyoto is at its best in spring and autumn. Machiya Kō is $214 a night with free cancellation, or Gion Studio is $188. I can load Kyoto stays if you tap Stays.";
  }
  if (/(cancel|change|refund|amend)/.test(text)) {
    return "Most sample stays offer free cancellation up to 48 hours before check-in. In production, the assistant would verify your booking reference and route the change through the booking API.";
  }
  if (/(bag|baggage|luggage|carry)/.test(text)) {
    return "The TAP Lisbon fare includes one carry-on. Checked bags depend on the airline and are shown before payment. The ANA Tokyo fare includes two checked bags.";
  }
  if (/(pay|card|stripe|secure|charge)/.test(text)) {
    return "The prototype validates the card on this device and never sends it anywhere. A production build would use a hosted card field such as Stripe Elements, with 3-D Secure and a webhook confirming the booking.";
  }
  if (/(flight|fly|airline)/.test(text)) {
    return "Flights and stays share one checkout here. Switch the search to Flights to see sample fares from $164, then pick a fare to continue to payment.";
  }
  if (/(lisbon|portugal)/.test(text)) {
    return "Lisbon has three sample stays from $142 a night and a nonstop TAP fare from $578. The Tejo House sleeps four if you are travelling with family.";
  }
  return "I can help with destinations, stays, flights, payments or an existing booking. Try asking about a beach escape, baggage, or how payment works.";
}

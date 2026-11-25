// Where Sky Soft's clients are, for the clients section (ClientsSimple.jsx and ClientsDotted.jsx).
// The company has more than 60,000 clients. The page shows how many there are in each place
// only as a level (TIERS), never as a number.

// Most clients first. `level` fills 3, 2 or 1 of the three bars beside each tier.
export const TIERS = [
  { id: 'main', level: 3 }, // Egypt and Saudi Arabia: most of the clients
  { id: 'region', level: 2 }, // elsewhere in the Middle East: fewer
  { id: 'far', level: 1 }, // outside the Middle East: a few
];

//   lon, lat  the pin; for 'main' places, the edge of the country the name sits against
//   label     where the name sits around the pin: center | up | down | left | right
//             (map directions, so they stay put in Arabic)
//   sm        the same, on phones
export const PLACES = [
  { id: 'eg', tier: 'main', lon: 24.6, lat: 26.6, label: 'left', sm: 'left' },
  { id: 'sa', tier: 'main', lon: 45, lat: 17, label: 'down', sm: 'down' },
  { id: 'jo', tier: 'region', lon: 36.6, lat: 31.1, label: 'up', sm: 'up' },
  { id: 'ae', tier: 'region', lon: 54.2, lat: 23.9, label: 'right', sm: 'up' },
  { id: 'br', tier: 'far', lon: -51.5, lat: -11, label: 'right', sm: 'right' },
  { id: 'gw', tier: 'far', lon: -15.1, lat: 12, label: 'left', sm: 'left' },
  // which Congo was not said: this spot on the river sits between Brazzaville and Kinshasa
  { id: 'cg', tier: 'far', lon: 15.3, lat: -4.3, label: 'right', sm: 'right' },
];

// The head office in Mansoura: Egypt and Saudi Arabia glow out from here on the dotted map
export const HQ = { lon: 31.38, lat: 31.04 };

// What phones show of the dotted map: the part of the world from Brazil to the Gulf
export const PHONE_VIEW = { west: -62, east: 64, north: 44, south: -36 };

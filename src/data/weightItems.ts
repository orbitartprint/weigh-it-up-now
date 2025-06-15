
export interface WeightItem {
  id: string;
  name: string;
  weight: number; // in kg
  category: "animals" | "celebrities" | "objects" | "custom";
  image?: string;
  fact?: string;
}

export const weightItems: WeightItem[] = [
  // Animals
  {
    id: "elephant",
    name: "African Elephant",
    weight: 6000,
    category: "animals",
    fact: "The largest land animal on Earth"
  },
  {
    id: "wolf",
    name: "Gray Wolf",
    weight: 40,
    category: "animals",
    fact: "Can travel up to 30 miles per day"
  },
  {
    id: "penguin",
    name: "Emperor Penguin",
    weight: 22,
    category: "animals",
    fact: "Can dive deeper than any other bird"
  },
  {
    id: "lion",
    name: "African Lion",
    weight: 190,
    category: "animals",
    fact: "Sleeps up to 20 hours per day"
  },
  {
    id: "cat",
    name: "House Cat",
    weight: 4.5,
    category: "animals",
    fact: "Purring may help heal bones and muscles"
  },

  // Objects
  {
    id: "washing-machine",
    name: "Washing Machine",
    weight: 70,
    category: "objects",
    fact: "Uses about 50 liters of water per cycle"
  },
  {
    id: "car",
    name: "Average Car",
    weight: 1500,
    category: "objects",
    fact: "Contains over 30,000 parts"
  },
  {
    id: "smartphone",
    name: "Smartphone",
    weight: 0.17,
    category: "objects",
    fact: "The first smartphone was created in 1992"
  },
  {
    id: "bowling-ball",
    name: "Bowling Ball",
    weight: 7.2,
    category: "objects",
    fact: "Professional bowlers may have 12-16 bowling balls"
  },
  {
    id: "bicycle",
    name: "Bicycle",
    weight: 10,
    category: "objects",
    fact: "Can be up to 5 times more efficient than walking"
  },

  // Celebrities
  {
    id: "dwayne-johnson",
    name: "Dwayne 'The Rock' Johnson",
    weight: 118,
    category: "celebrities",
    fact: "Former professional wrestler turned actor"
  },
  {
    id: "ariana-grande",
    name: "Ariana Grande",
    weight: 48,
    category: "celebrities",
    fact: "Five-octave vocal range"
  },
  {
    id: "lebron-james",
    name: "LeBron James",
    weight: 113,
    category: "celebrities",
    fact: "Four-time NBA champion"
  },
  {
    id: "taylor-swift",
    name: "Taylor Swift",
    weight: 56,
    category: "celebrities",
    fact: "Has won over 10 Grammy Awards"
  },
  {
    id: "tom-cruise",
    name: "Tom Cruise",
    weight: 68,
    category: "celebrities",
    fact: "Performs many of his own stunts"
  }
];

export const getItemsByCategory = (category: string) => {
  return weightItems.filter(item => item.category === category);
};

export const getItemById = (id: string) => {
  return weightItems.find(item => item.id === id);
};

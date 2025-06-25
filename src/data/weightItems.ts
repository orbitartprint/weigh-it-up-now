export interface WeightItem {
  id: string;
  name: string;
  weight: number; // in kg
  category: "animals" | "celebrities" | "objects" | "vehicles" | "historical" | "fictional" | "infrastructure" | "food" | "sports" | "custom";
  image?: string;
  fact?: string;
}

export const weightItems: WeightItem[] = [
  // Existing Animals
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

  // New Animals
  {
    id: "rhinoceros",
    name: "Rhinoceros",
    weight: 2300,
    category: "animals",
    image: "/assets/images/rhino.svg",
    fact: "Its horn is made of keratin, the same material as human hair and nails."
  },
  {
    id: "hippopotamus",
    name: "Hippopotamus",
    weight: 1500,
    category: "animals",
    image: "/assets/images/hippo.svg",
    fact: "Spends up to 16 hours a day in water."
  },
  {
    id: "polar-bear",
    name: "Polar Bear",
    weight: 450,
    category: "animals",
    image: "/assets/images/polar_bear.svg",
    fact: "Has a thick layer of blubber for insulation in cold climates."
  },
  {
    id: "giraffe",
    name: "Giraffe",
    weight: 1200,
    category: "animals",
    image: "/assets/images/giraffe.svg",
    fact: "The tallest mammal in the world."
  },
  {
    id: "gorilla",
    name: "Gorilla",
    weight: 180,
    category: "animals",
    image: "/assets/images/gorilla.svg",
    fact: "Can build nests in trees or on the ground."
  },
  {
    id: "kangaroo",
    name: "Kangaroo",
    weight: 60,
    category: "animals",
    image: "/assets/images/kangaroo.svg",
    fact: "Can hop at speeds of over 60 km/h."
  },
  {
    id: "squirrel",
    name: "Squirrel",
    weight: 0.5,
    category: "animals",
    image: "/assets/images/squirrel.svg",
    fact: "Known for burying nuts for later consumption."
  },
  {
    id: "rabbit",
    name: "Rabbit",
    weight: 2,
    category: "animals",
    image: "/assets/images/rabbit.svg",
    fact: "Their teeth never stop growing."
  },
  {
    id: "orca",
    name: "Orca (Killer Whale)",
    weight: 5500,
    category: "animals",
    image: "/assets/images/orca.svg",
    fact: "The largest member of the dolphin family."
  },
  {
    id: "blue-whale",
    name: "Blue Whale",
    weight: 100000, // 100 tonnes
    category: "animals",
    image: "/assets/images/blue_whale.svg",
    fact: "The largest animal known to have ever lived."
  },
  {
    id: "grizzly-bear",
    name: "Grizzly Bear",
    weight: 360,
    category: "animals",
    image: "/assets/images/grizzly_bear.svg",
    fact: "Can run as fast as a horse over short distances."
  },
  {
    id: "anaconda",
    name: "Green Anaconda",
    weight: 100,
    category: "animals",
    image: "/assets/images/anaconda.svg",
    fact: "One of the longest and heaviest snakes in the world."
  },
  {
    id: "ostrich",
    name: "Ostrich",
    weight: 100,
    category: "animals",
    image: "/assets/images/ostrich.svg",
    fact: "The largest and heaviest living bird, but cannot fly."
  },

  // Extinct Animals
  {
    id: "mammoth",
    name: "Woolly Mammoth",
    weight: 6000,
    category: "animals", // Could also be 'historical_animals' or 'extinct'
    image: "/assets/images/mammoth.svg",
    fact: "Lived during the Ice Age and had long, curved tusks."
  },
  {
    id: "t-rex",
    name: "Tyrannosaurus Rex",
    weight: 9000,
    category: "animals", // Could also be 'dinosaurs'
    image: "/assets/images/t_rex.svg",
    fact: "One of the largest land predators of all time."
  },
  {
    id: "saber-toothed-cat",
    name: "Saber-toothed Cat",
    weight: 200,
    category: "animals",
    image: "/assets/images/saber_tooth.svg",
    fact: "Known for its extremely long, sharp canine teeth."
  },

  // Existing Objects
  {
    id: "washing-machine",
    name: "Washing Machine",
    weight: 70,
    category: "objects",
    fact: "Uses about 50 liters of water per cycle"
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

  // New Objects (Household & Everyday)
  {
    id: "refrigerator",
    name: "Refrigerator",
    weight: 100,
    category: "objects",
    image: "/assets/images/refrigerator.svg",
    fact: "Invented in the early 20th century to preserve food."
  },
  {
    id: "king-size-bed",
    name: "King-Size Bed",
    weight: 80, // Mattress + frame
    category: "objects",
    image: "/assets/images/bed.svg",
    fact: "Offers ample space for comfortable sleep."
  },
  {
    id: "grand-piano",
    name: "Grand Piano",
    weight: 400,
    category: "objects",
    image: "/assets/images/piano.svg",
    fact: "Can have over 12,000 individual parts."
  },
  {
    id: "sofa-3-seater",
    name: "3-Seater Sofa",
    weight: 90,
    category: "objects",
    image: "/assets/images/sofa.svg",
    fact: "A common piece of furniture for living rooms."
  },
  {
    id: "bag-of-cement",
    name: "Bag of Cement",
    weight: 25,
    category: "objects",
    image: "/assets/images/cement_bag.svg",
    fact: "A key ingredient in concrete production."
  },
  {
    id: "gold-bar",
    name: "Standard Gold Bar",
    weight: 12.4, // 400 troy ounces
    category: "objects",
    image: "/assets/images/gold_bar.svg",
    fact: "A standard gold bar weighs around 400 troy ounces."
  },
  {
    id: "brick",
    name: "Standard Brick",
    weight: 2.5,
    category: "objects",
    image: "/assets/images/brick.svg",
    fact: "Used as building material for thousands of years."
  },

  // New Category: Vehicles
  {
    id: "average-car", // Existing, but now in 'vehicles'
    name: "Average Car",
    weight: 1500,
    category: "vehicles",
    image: "/assets/images/car.svg",
    fact: "Contains over 30,000 parts."
  },
  {
    id: "motorcycle",
    name: "Motorcycle",
    weight: 200,
    category: "vehicles",
    image: "/assets/images/motorcycle.svg",
    fact: "First motorized bicycle was built in 1885."
  },
  {
    id: "suv",
    name: "Large SUV",
    weight: 2500,
    category: "vehicles",
    image: "/assets/images/suv.svg",
    fact: "Known for their spacious interiors and off-road capabilities."
  },
  {
    id: "city-bus",
    name: "City Bus (empty)",
    weight: 13000,
    category: "vehicles",
    image: "/assets/images/bus.svg",
    fact: "Can transport dozens of passengers at once."
  },
  {
    id: "airplane-boeing737",
    name: "Boeing 737 (empty)",
    weight: 41000,
    category: "vehicles",
    image: "/assets/images/boeing737.svg",
    fact: "One of the most widely used aircraft in the world."
  },
  {
    id: "train-wagon",
    name: "Train Wagon (empty)",
    weight: 25000,
    category: "vehicles",
    image: "/assets/images/train_wagon.svg",
    fact: "Part of a railway train, designed to carry cargo or passengers."
  },
  {
    id: "tank",
    name: "Main Battle Tank (MBT)",
    weight: 60000,
    category: "vehicles",
    image: "/assets/images/tank.svg",
    fact: "A heavily armored and armed combat vehicle."
  },

  // Existing Celebrities
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
  },

  // New Celebrities
  {
    id: "billie-eilish",
    name: "Billie Eilish",
    weight: 54,
    category: "celebrities",
    image: "/assets/images/billie_eilish.svg",
    fact: "Youngest artist to win the four main Grammy categories in one year."
  },
  {
    id: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    weight: 85,
    category: "celebrities",
    image: "/assets/images/cristiano_ronaldo.svg",
    fact: "One of the world's most famous and successful footballers."
  },
  {
    id: "adele",
    name: "Adele",
    weight: 80, // Approximate
    category: "celebrities",
    image: "/assets/images/adele.svg",
    fact: "Known for her soulful voice and powerful ballads."
  },
  {
    id: "kevin-hart",
    name: "Kevin Hart",
    weight: 64,
    category: "celebrities",
    image: "/assets/images/kevin_hart.svg",
    fact: "A popular comedian and actor, known for his energetic performances."
  },
  {
    id: "arnold-schwarzenegger",
    name: "Arnold Schwarzenegger",
    weight: 107, // Peak bodybuilding weight
    category: "celebrities",
    image: "/assets/images/arnold.svg",
    fact: "Former professional bodybuilder, actor, and politician."
  },
  {
    id: "queen-elizabeth",
    name: "Queen Elizabeth II",
    weight: 55, // Estimated
    category: "celebrities", // Could also be 'historical'
    image: "/assets/images/queen_elizabeth.svg",
    fact: "The longest-reigning monarch in British history."
  },

  // New Category: Historical
  {
    id: "roman-legionary-full-kit",
    name: "Roman Legionary (full kit)",
    weight: 100, // Soldier + armor + weapons
    category: "historical",
    image: "/assets/images/roman_legionary.svg",
    fact: "A Roman legionary carried approximately 30-45 kg of gear."
  },
  {
    id: "medieval-knight-armor",
    name: "Medieval Knight (full armor)",
    weight: 150, // Knight + armor
    category: "historical",
    image: "/assets/images/medieval_knight.svg",
    fact: "Full plate armor typically weighed between 20-30 kg."
  },
  {
    id: "chariot",
    name: "Ancient Egyptian Chariot",
    weight: 300, // Empty
    category: "historical",
    image: "/assets/images/chariot.svg",
    fact: "Light, two-wheeled carts primarily used for warfare and hunting."
  },
  {
    id: "viking-longship",
    name: "Viking Longship (empty)",
    weight: 20000, // Estimated for a mid-sized one
    category: "historical",
    image: "/assets/images/viking_ship.svg",
    fact: "Designed for speed and maneuverability, capable of crossing open seas."
  },

  // New Category: Infrastructure
  {
    id: "meter-autobahn",
    name: "1 Meter of Autobahn",
    weight: 10000, // 10 tonnes (estimated, highly variable based on design)
    category: "infrastructure",
    image: "/assets/images/autobahn.svg",
    fact: "Germany's federal highway system, famous for sections without speed limits."
  },
  {
    id: "small-bridge-pillar",
    name: "Small Bridge Pillar",
    weight: 500000, // 500 tonnes (highly variable)
    category: "infrastructure",
    image: "/assets/images/bridge_pillar.svg",
    fact: "A fundamental structural element supporting bridges."
  },
  {
    id: "concrete-block-1m3",
    name: "1 Cubic Meter of Concrete",
    weight: 2400,
    category: "infrastructure",
    image: "/assets/images/concrete_block.svg",
    fact: "The most widely used building material in the world."
  },

  // New Category: Food
  {
    id: "sugar-sack",
    name: "Sack of Sugar",
    weight: 50,
    category: "food",
    image: "/assets/images/sugar_sack.svg",
    fact: "A common commodity used in cooking and baking worldwide."
  },
  {
    id: "tonne-potatoes",
    name: "1 Tonne of Potatoes",
    weight: 1000,
    category: "food",
    image: "/assets/images/potatoes.svg",
    fact: "A staple food in many parts of the world."
  },
  {
    id: "cow-carcass",
    name: "Beef Carcass (Half)",
    weight: 300, // Approx.
    category: "food",
    image: "/assets/images/beef_carcass.svg",
    fact: "Represents the butchered portion of a cow."
  },

  // New Category: Sports
  {
    id: "dumbbell-set",
    name: "Dumbbell Set (adjustable)",
    weight: 25, // A typical adjustable set
    category: "sports",
    image: "/assets/images/dumbbell_set.svg",
    fact: "Versatile free weights for strength training."
  },
  {
    id: "treadmill",
    name: "Treadmill",
    weight: 100,
    category: "sports",
    image: "/assets/images/treadmill.svg",
    fact: "Allows for indoor running or walking exercise."
  },
  {
    id: "weightlifting-barbell",
    name: "Weightlifting Barbell (empty)",
    weight: 20,
    category: "sports",
    image: "/assets/images/barbell.svg",
    fact: "Standard weight for an Olympic barbell."
  },

  // New Category: Fictional (Optional, if you decide to include it)
  {
    id: "godzilla-legendary",
    name: "Godzilla (Legendary)",
    weight: 99634000, // 99,634 tonnes
    category: "fictional",
    image: "/assets/images/godzilla.svg",
    fact: "The 'King of the Monsters' from Japanese pop culture."
  },
  {
    id: "bb8-droid",
    name: "BB-8 Droid",
    weight: 18,
    category: "fictional",
    image: "/assets/images/bb8.svg",
    fact: "A loyal astromech droid from the Star Wars universe."
  },
];

export const getItemsByCategory = (category: string) => {
  return weightItems.filter(item => item.category === category);
};

export const getItemById = (id: string) => {
  return weightItems.find(item => item.id === id);
};


export interface WeightItem {
  id: string;
  name: string;
  weight: number; // in kg
  category: "animals" | "celebrities" | "objects" | "vehicles" | "historical" | "fictional" | "infrastructure" | "food" | "sports" | "custom" | "micro" | "buildings" | "dinosaurs";
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
    id: "airplane-boeing747",
    name: "Boeing 747 (empty)",
    weight: 410000,
    category: "vehicles",
    image: "/assets/images/boeing747.svg",
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

  // Dinosaurs Category
  {
    id: "tyrannosaurus-rex",
    name: "Tyrannosaurus Rex",
    weight: 7000, // 7,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/tyrannosaurus_rex.svg",
    fact: "One of the largest land predators, known for its powerful bite."
  },
  {
    id: "triceratops",
    name: "Triceratops",
    weight: 6000, // 6,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/triceratops.svg",
    fact: "A large, horned dinosaur with a distinctive frill, often associated with T. Rex."
  },
  {
    id: "stegosaurus",
    name: "Stegosaurus",
    weight: 5000, // 5,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/stegosaurus.svg",
    fact: "Famous for the plates along its back and a spiked tail called a 'thagomizer'."
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    weight: 15, // 15 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/velociraptor.svg",
    fact: "A small, agile predator with a distinctive sickle-shaped claw on each foot."
  },
  {
    id: "brachiosaurus",
    name: "Brachiosaurus",
    weight: 50000, // 40,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/brachiosaurus.svg",
    fact: "One of the tallest and heaviest dinosaurs, known for its long neck and front legs."
  },
  {
    id: "ankylosaurus",
    name: "Ankylosaurus",
    weight: 6000, // 6,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/ankylosaurus.svg",
    fact: "A heavily armored dinosaur with a large club-like tail for defense."
  },
  {
    id: "spinosaurus",
    name: "Spinosaurus",
    weight: 7000, // 7,000 kg (approx., can vary widely)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/spinosaurus.svg",
    fact: "A large, semi-aquatic predator distinguished by its prominent sail-like fin on its back."
  },
  {
    id: "allosaurus",
    name: "Allosaurus",
    weight: 2000, // 2,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/allosaurus.svg",
    fact: "A large, carnivorous theropod from the Late Jurassic period, often considered the 'lion of the Jurassic'."
  },
  {
    id: "diplodocus",
    name: "Diplodocus",
    weight: 15000, // 15,000 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/diplodocus.svg",
    fact: "A very long-necked sauropod, known for its whip-like tail."
  },
  {
    id: "parasaurolophus",
    name: "Parasaurolophus",
    weight: 2500, // 2,500 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/parasaurolophus.svg",
    fact: "A hadrosaur known for its elaborate, hollow cranial crest."
  },
  {
    id: "iguanodon",
    name: "Iguanodon",
    weight: 4500, // 4,500 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/iguanodon.svg",
    fact: "One of the first dinosaurs ever discovered, famous for its thumb spike."
  },
  {
    id: "compsognathus",
    name: "Compsognathus",
    weight: 0.8, // 0.8 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/compsognathus.svg",
    fact: "One of the smallest known dinosaurs, about the size of a chicken."
  },
  {
    id: "carnotaurus",
    name: "Carnotaurus",
    weight: 1500, // 1,500 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/carnotaurus.svg",
    fact: "A carnivorous dinosaur distinguished by its two prominent horns above the eyes."
  },
  {
    id: "dilophosaurus",
    name: "Dilophosaurus",
    weight: 400, // 400 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/dilophosaurus.svg",
    fact: "A predatory dinosaur characterized by two prominent crests on its head."
  },
  {
    id: "gallimimus",
    name: "Gallimimus",
    weight: 450, // 450 kg (approx.)
    category: "dinosaurs",
    image: "/assets/images/dinosaurs/gallimimus.svg",
    fact: "A fast, ostrich-like dinosaur that likely ate plants and small animals."
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

  // Micro Category
  {
    id: "human-hair",
    name: "Human Hair Strand",
    weight: 0.00000003, // 30 nanograms = 0.00000003 kg
    category: "micro",
    image: "/assets/images/human_hair.svg",
    fact: "A single strand of human hair is incredibly light, yet surprisingly strong."
  },
  {
    id: "dust-mite",
    name: "Dust Mite",
    weight: 0.0000001, // 0.1 micrograms = 0.0000001 kg
    category: "micro",
    image: "/assets/images/dust_mite.svg",
    fact: "Invisible to the naked eye, these tiny creatures live in dust."
  },
  {
    id: "amoeba",
    name: "Amoeba",
    weight: 0.0000000001, // 0.1 nanograms = 0.0000000001 kg (approx. for a typical large amoeba)
    category: "micro",
    image: "/assets/images/amoeba.svg",
    fact: "A single-celled organism that changes its shape constantly."
  },
  {
    id: "e-coli-bacterium",
    name: "E. coli Bacterium",
    weight: 0.0000000000000006, // 0.6 picograms = 0.0000000000000006 kg
    category: "micro",
    image: "/assets/images/e_coli.svg",
    fact: "A common bacterium found in the intestines of warm-blooded animals."
  },
  {
    id: "red-blood-cell",
    name: "Human Red Blood Cell",
    weight: 0.00000000000009, // 90 picograms = 0.00000000000009 kg
    category: "micro",
    image: "/assets/images/red_blood_cell.svg",
    fact: "Responsible for carrying oxygen from the lungs to the body's tissues."
  },
  {
    id: "covid-19-virion",
    name: "COVID-19 Virus Particle",
    weight: 0.000000000000000001, // 1 femtogram = 0.000000000000000001 kg (approx.)
    category: "micro",
    image: "/assets/images/covid_virus.svg",
    fact: "The infectious agent that causes COVID-19."
  },
  {
    id: "water-molecule",
    name: "Water Molecule (H2O)",
    weight: 0.0000000000000000000000000000299, // 2.99 x 10^-26 kg
    category: "micro",
    image: "/assets/images/water_molecule.svg",
    fact: "The fundamental building block of water."
  },
  {
    id: "grain-of-sand",
    name: "Grain of Sand",
    weight: 0.00005, // 50 micrograms = 0.00005 kg (average for beach sand)
    category: "micro",
    image: "/assets/images/grain_of_sand.svg",
    fact: "A tiny particle of rock or other granular material."
  },
  {
    id: "feather-hummingbird",
    name: "Hummingbird Feather",
    weight: 0.000001, // 1 milligram = 0.000001 kg (approx.)
    category: "micro",
    image: "/assets/images/hummingbird_feather.svg",
    fact: "Extremely lightweight, contributing to their agile flight."
  },
  {
    id: "speck-of-dust",
    name: "Average Speck of Dust",
    weight: 0.0000000007, // 0.7 micrograms = 0.0000000007 kg (highly variable)
    category: "micro",
    image: "/assets/images/dust_speck.svg",
    fact: "Composed of tiny particles of various materials."
  },
  // Buildings Category
  {
    id: "great-pyramid-giza",
    name: "Great Pyramid of Giza",
    weight: 5750000000, // 5.75 billion kg (approx. 5.75 million tonnes)
    category: "buildings",
    image: "/assets/images/pyramid.svg",
    fact: "The oldest and largest of the three pyramids in the Giza Necropolis."
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    weight: 10100000, // 10,100,000 kg (10,100 tonnes)
    category: "buildings",
    image: "/assets/images/eiffel_tower.svg",
    fact: "An iron lattice tower on the Champ de Mars in Paris, France."
  },
  {
    id: "empire-state-building",
    name: "Empire State Building",
    weight: 365000000, // 365,000,000 kg (365,000 tonnes)
    category: "buildings",
    image: "/assets/images/empire_state_building.svg",
    fact: "A 102-story Art Deco skyscraper in Midtown Manhattan, New York City."
  },
  {
    id: "leaning-tower-pisa",
    name: "Leaning Tower of Pisa",
    weight: 14500000, // 14,500,000 kg (14,500 tonnes)
    category: "buildings",
    image: "/assets/images/pisa_tower.svg",
    fact: "The campanile, or freestanding bell tower, of the cathedral of Pisa."
  },
  {
    id: "burj-khalifa",
    name: "Burj Khalifa",
    weight: 500000000, // 500,000,000 kg (500,000 tonnes)
    category: "buildings",
    image: "/assets/images/burj_khalifa.svg",
    fact: "The tallest building and structure in the world."
  },
  {
    id: "sphinx",
    name: "Great Sphinx of Giza",
    weight: 2000000, // 2,000,000 kg (2,000 tonnes, carved from bedrock)
    category: "buildings",
    image: "/assets/images/sphinx.svg",
    fact: "A limestone statue of a reclining sphinx, located on the Giza Plateau."
  },
  {
    id: "sydney-opera-house",
    name: "Sydney Opera House",
    weight: 187000000, // 187,000,000 kg (187,000 tonnes)
    category: "buildings",
    image: "/assets/images/sydney_opera_house.svg",
    fact: "A multi-venue performing arts centre in Sydney, New South Wales, Australia."
  },
  {
    id: "colosseum",
    name: "Colosseum",
    weight: 100000000, // 100,000,000 kg (100,000 tonnes, rough estimate based on volume of stone)
    category: "buildings",
    image: "/assets/images/colosseum.svg",
    fact: "An oval amphitheatre in the centre of the city of Rome, Italy."
  },
  {
    id: "leaning-tower-of-suurhusen",
    name: "Leaning Tower of Suurhusen",
    weight: 2116000, // 2,116,000 kg (2,116 tonnes)
    category: "buildings",
      image: "/assets/images/suurhusen_tower.svg",
    fact: "The most crooked tower in the world, leaning more than the Tower of Pisa."
  },
  {
    id: "statue-of-liberty",
    name: "Statue of Liberty",
    weight: 204000, // 204,000 kg (204 tonnes, statue itself, without pedestal)
    category: "buildings", // Often considered a monument/structure
    image: "/assets/images/statue_of_liberty.svg",
    fact: "A colossal neoclassical sculpture on Liberty Island in New York Harbor."
  },
];

export const getItemsByCategory = (category: string) => {
  return weightItems.filter(item => item.category === category);
};

export const getItemById = (id: string) => {
  return weightItems.find(item => item.id === id);
};

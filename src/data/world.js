const asset = (baseUrl, path) => `${baseUrl}${path}`;

export const WORLD_HOME = { x: 0.52, y: 0.51, rotation: 0 };

export const BOAT_DESTINATIONS = {
  home: WORLD_HOME,
  game: { x: 0.34, y: 0.49 },
  learning: { x: 0.51, y: 0.34 },
  technology: { x: 0.4, y: 0.68 },
  career: { x: 0.68, y: 0.67 },
  education: { x: 0.77, y: 0.48 },
};

export const ISLANDS = [
  {
    islandKey: "learning",
    name: "Learning & Education",
    subtitle: "Educational technology & learning design",
    image: "world/islands/learning-island.webp",
    size: "clamp(11.5rem, 24vw, 21rem)",
    position: { left: "70%", top: "73%", zIndex: 2 },
    description: "Educational technology, game-based learning, and thoughtful learning experiences.",
    projects: ["Math Tactics", "Learning applications", "Game-based learning"],
  },
  {
    islandKey: "game",
    name: "Game & Play",
    subtitle: "Games, systems & interaction",
    image: "world/islands/game-island.webp",
    size: "clamp(13rem, 27vw, 23rem)",
    position: { left: "24%", top: "42%", zIndex: 3 },
    description: "Experiments in systems, interaction, and play.",
    projects: ["Math Tactics", "Deadline Simulator", "Hunting Rabbit", "Weight Game"],
  },
  {
    islandKey: "education",
    name: "Education",
    subtitle: "Academic journey",
    image: "world/islands/education-island.webp",
    size: "clamp(8rem, 15vw, 12.5rem)",
    position: { left: "79%", top: "40%", zIndex: 2 },
    description: "The studies, communities, and questions that shaped my journey.",
    projects: ["M.S. in Games for Learning", "B.B.A. in Information Management"],
  },
  {
    islandKey: "technology",
    name: "Technology",
    subtitle: "Software, web & interactive systems",
    image: "world/islands/technology-island.webp",
    size: "clamp(9.5rem, 19vw, 16rem)",
    position: { left: "38%", top: "75%", zIndex: 2 },
    description: "Software development, interactive systems, and practical tools for people.",
    projects: ["Musleep", "Venology", "Web development"],
  },
  {
    islandKey: "career",
    name: "Career Harbor",
    subtitle: "Professional work experience",
    image: "world/islands/career-harbor.webp",
    size: "clamp(9rem, 17vw, 14rem)",
    position: { left: "51%", top: "23%", zIndex: 2 },
    description: "Professional experiences, collaborations, and work along the way.",
    projects: ["Work experience", "Selected collaborations"],
  },
];

export const createWorldAssets = (baseUrl) => ({
  islands: ISLANDS.map((island) => ({
    ...island,
    image: asset(baseUrl, island.image),
  })),
  ocean: {
    waveOne: asset(baseUrl, "world/ocean/wave-01.webp"),
    waveTwo: asset(baseUrl, "world/ocean/wave-02.webp"),
    rocks: asset(baseUrl, "world/ocean/rocks.webp"),
    smallIsland: asset(baseUrl, "world/ocean/small-island.webp"),
    fish: asset(baseUrl, "world/ocean/fish.webp"),
    buoy: asset(baseUrl, "world/ocean/buoy.webp"),
    cloud: asset(baseUrl, "world/ocean/cloud.webp"),
  },
  boatImage: asset(baseUrl, "world/boat/boat.webp"),
  wakeImage: asset(baseUrl, "world/boat/boat-wake.webp"),
});

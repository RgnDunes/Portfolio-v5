export const TILE_SIZE = 32;
export const MAP_COLS = 40;
export const MAP_ROWS = 30;

export enum Tile {
  WATER = 0,
  SAND = 1,
  GRASS = 2,
  PATH = 3,
  TREE = 4,
  FLOWER_RED = 5,
  FLOWER_YELLOW = 6,
  BUILDING = 7,
  DOOR = 8,
  BRIDGE = 9,
  SIGNPOST = 10,
  FENCE = 11,
  TALL_GRASS = 12,
}

export const SOLID_TILES = new Set([
  Tile.WATER,
  Tile.TREE,
  Tile.BUILDING,
  Tile.SIGNPOST,
  Tile.FENCE,
]);

export interface BuildingDef {
  id: string;
  label: string;
  icon: string;
  color: string;
  doorTile: { x: number; y: number };
  roofArea: { x: number; y: number; w: number; h: number };
}

export interface NPCDef {
  id: string;
  name: string;
  tile: { x: number; y: number };
  direction: "down" | "up" | "left" | "right";
  dialogue: string[];
  skinColor: string;
  shirtColor: string;
}

export interface GemDef {
  id: string;
  label: string;
  color: string;
  tile: { x: number; y: number };
  points: number;
}

// --- Building definitions ---
// About (northwest), Experience (north-center), Skills (northeast)
// Projects (southwest), Blog (south-center), Contact (southeast)
export const BUILDINGS: BuildingDef[] = [
  {
    id: "about",
    label: "About",
    icon: "A",
    color: "#c84b31",
    doorTile: { x: 7, y: 8 },
    roofArea: { x: 6, y: 5, w: 4, h: 3 },
  },
  {
    id: "experience",
    label: "Experience",
    icon: "E",
    color: "#8B7355",
    doorTile: { x: 19, y: 6 },
    roofArea: { x: 18, y: 3, w: 4, h: 3 },
  },
  {
    id: "skills",
    label: "Skills",
    icon: "S",
    color: "#4a90d9",
    doorTile: { x: 31, y: 8 },
    roofArea: { x: 30, y: 5, w: 4, h: 3 },
  },
  {
    id: "projects",
    label: "Projects",
    icon: "P",
    color: "#d69e2e",
    doorTile: { x: 7, y: 22 },
    roofArea: { x: 6, y: 19, w: 4, h: 3 },
  },
  {
    id: "blog",
    label: "Blog",
    icon: "B",
    color: "#805ad5",
    doorTile: { x: 19, y: 24 },
    roofArea: { x: 18, y: 21, w: 4, h: 3 },
  },
  {
    id: "contact",
    label: "Contact",
    icon: "C",
    color: "#2a6e4a",
    doorTile: { x: 31, y: 22 },
    roofArea: { x: 30, y: 19, w: 4, h: 3 },
  },
];

// --- NPCs ---
export const NPCS: NPCDef[] = [
  {
    id: "npc-about",
    name: "Old Sage",
    tile: { x: 9, y: 9 },
    direction: "left",
    dialogue: [
      "Welcome, traveler! I am the village sage.",
      "Step through the About door to learn who built this world.",
      "Divyansh is a Senior Frontend Engineer with a passion for elegant code.",
    ],
    skinColor: "#e8b88a",
    shirtColor: "#7c5cbf",
  },
  {
    id: "npc-experience",
    name: "Merchant",
    tile: { x: 21, y: 7 },
    direction: "down",
    dialogue: [
      "Ah, a curious soul! I catalog the journey of our creator.",
      "From Razorpay to Rippling, each chapter shaped his craft.",
      "Enter the Experience hall to see the full timeline.",
    ],
    skinColor: "#c9956b",
    shirtColor: "#d4763e",
  },
  {
    id: "npc-skills",
    name: "Blacksmith",
    tile: { x: 33, y: 9 },
    direction: "left",
    dialogue: [
      "I forge the tools that build great software!",
      "TypeScript, React, Next.js, and many more...",
      "Check the Skills armory to see the full arsenal.",
    ],
    skinColor: "#f5c5a3",
    shirtColor: "#3a7bd5",
  },
  {
    id: "npc-projects",
    name: "Inventor",
    tile: { x: 9, y: 23 },
    direction: "right",
    dialogue: [
      "Behold my workshop of wonders!",
      "i18nify, CompliQ, DOMinator... each a labor of love.",
      "The Projects lab has demos and links to explore.",
    ],
    skinColor: "#f0d5b8",
    shirtColor: "#c4a62d",
  },
  {
    id: "npc-blog",
    name: "Scribe",
    tile: { x: 21, y: 25 },
    direction: "up",
    dialogue: [
      "I pen the chronicles of engineering wisdom.",
      "Deep dives into React 19, npm security, and more.",
      "Visit the Blog archives for 10+ articles!",
    ],
    skinColor: "#d4a76a",
    shirtColor: "#6b46c1",
  },
  {
    id: "npc-contact",
    name: "Courier",
    tile: { x: 33, y: 23 },
    direction: "left",
    dialogue: [
      "Need to send a message? I'm your courier!",
      "Email, LinkedIn, GitHub, Twitter... many paths exist.",
      "Enter the Contact post office to reach out.",
    ],
    skinColor: "#f5c5a3",
    shirtColor: "#276749",
  },
];

// --- Gems ---
export const GEMS: GemDef[] = [
  { id: "gem-1", label: "TypeScript", color: "#3178c6", tile: { x: 12, y: 10 }, points: 10 },
  { id: "gem-2", label: "React", color: "#61dafb", tile: { x: 15, y: 7 }, points: 10 },
  { id: "gem-3", label: "Next.js", color: "#ffffff", tile: { x: 25, y: 8 }, points: 10 },
  { id: "gem-4", label: "Redux", color: "#764abc", tile: { x: 28, y: 12 }, points: 10 },
  { id: "gem-5", label: "Tailwind", color: "#38bdf8", tile: { x: 11, y: 17 }, points: 10 },
  { id: "gem-6", label: "Jest", color: "#c63d14", tile: { x: 14, y: 20 }, points: 10 },
  { id: "gem-7", label: "Webpack", color: "#8dd6f9", tile: { x: 26, y: 18 }, points: 10 },
  { id: "gem-8", label: "Docker", color: "#2496ed", tile: { x: 35, y: 14 }, points: 10 },
  { id: "gem-9", label: "Node.js", color: "#68a063", tile: { x: 5, y: 14 }, points: 10 },
  { id: "gem-10", label: "GraphQL", color: "#e535ab", tile: { x: 17, y: 13 }, points: 10 },
  { id: "gem-11", label: "Vite", color: "#646cff", tile: { x: 23, y: 13 }, points: 10 },
  { id: "gem-12", label: "Cypress", color: "#04c38e", tile: { x: 10, y: 25 }, points: 10 },
  { id: "gem-13", label: "AWS", color: "#ff9900", tile: { x: 30, y: 25 }, points: 10 },
  { id: "gem-14", label: "Rollup", color: "#ef3335", tile: { x: 13, y: 14 }, points: 10 },
  { id: "gem-15", label: "Babel", color: "#f5da55", tile: { x: 27, y: 22 }, points: 10 },
  { id: "gem-16", label: "Vue", color: "#42b883", tile: { x: 35, y: 17 }, points: 10 },
  { id: "gem-17", label: "Zustand", color: "#f59e42", tile: { x: 5, y: 20 }, points: 10 },
  { id: "gem-18", label: "Playwright", color: "#45ba63", tile: { x: 24, y: 26 }, points: 10 },
  { id: "gem-19", label: "Kubernetes", color: "#326ce5", tile: { x: 16, y: 26 }, points: 10 },
  { id: "gem-20", label: "i18nify", color: "#fbbf24", tile: { x: 20, y: 15 }, points: 10 },
];

// --- Map generation ---
function createBaseMap(): Tile[][] {
  const map: Tile[][] = [];
  for (let r = 0; r < MAP_ROWS; r++) {
    const row: Tile[] = [];
    for (let c = 0; c < MAP_COLS; c++) {
      // Water border (outer 2 rows/cols)
      if (r < 2 || r >= MAP_ROWS - 2 || c < 2 || c >= MAP_COLS - 2) {
        row.push(Tile.WATER);
      }
      // Sand border (row/col 2-3)
      else if (r < 4 || r >= MAP_ROWS - 4 || c < 4 || c >= MAP_COLS - 4) {
        row.push(Tile.SAND);
      }
      // Interior grass
      else {
        row.push(Tile.GRASS);
      }
    }
    map.push(row);
  }
  return map;
}

function placeBuildings(map: Tile[][]): void {
  for (const b of BUILDINGS) {
    const { x: bx, y: by, w: bw, h: bh } = b.roofArea;
    for (let r = by; r < by + bh; r++) {
      for (let c = bx; c < bx + bw; c++) {
        if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS) {
          map[r][c] = Tile.BUILDING;
        }
      }
    }
    // Place door
    const { x: dx, y: dy } = b.doorTile;
    if (dy >= 0 && dy < MAP_ROWS && dx >= 0 && dx < MAP_COLS) {
      map[dy][dx] = Tile.DOOR;
    }
  }
}

function placePaths(map: Tile[][]): void {
  // Horizontal path connecting west and east buildings (row 10)
  for (let c = 5; c <= 35; c++) {
    if (map[10][c] === Tile.GRASS) map[10][c] = Tile.PATH;
    if (map[11][c] === Tile.GRASS) map[11][c] = Tile.PATH;
  }

  // Horizontal path connecting west and east buildings (row 20)
  for (let c = 5; c <= 35; c++) {
    if (map[20][c] === Tile.GRASS) map[20][c] = Tile.PATH;
  }

  // Central vertical path (col 19-20) connecting north and south rows
  for (let r = 5; r <= 26; r++) {
    if (map[r][19] === Tile.GRASS) map[r][19] = Tile.PATH;
    if (map[r][20] === Tile.GRASS) map[r][20] = Tile.PATH;
  }

  // Left vertical path (col 7) connecting NW and SW buildings
  for (let r = 8; r <= 22; r++) {
    if (map[r][7] === Tile.GRASS) map[r][7] = Tile.PATH;
  }

  // Right vertical path (col 31) connecting NE and SE buildings
  for (let r = 8; r <= 22; r++) {
    if (map[r][31] === Tile.GRASS) map[r][31] = Tile.PATH;
  }

  // Central plaza area around spawn (18-22 x 14-16)
  for (let r = 13; r <= 17; r++) {
    for (let c = 17; c <= 23; c++) {
      if (map[r][c] === Tile.GRASS) map[r][c] = Tile.PATH;
    }
  }
}

function placeTrees(map: Tile[][]): void {
  const treePositions = [
    [5, 5], [6, 12], [10, 4], [4, 16], [5, 24],
    [12, 6], [14, 28], [15, 34], [16, 5], [22, 6],
    [24, 4], [25, 15], [25, 24], [26, 34], [17, 35],
    [8, 35], [4, 28], [27, 9], [27, 16], [27, 28],
    [12, 22], [8, 15], [23, 33], [14, 5],
  ];
  for (const [r, c] of treePositions) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS && map[r][c] === Tile.GRASS) {
      map[r][c] = Tile.TREE;
    }
  }
}

function placeFlowers(map: Tile[][]): void {
  const flowerPositions: [number, number, Tile][] = [
    [6, 10, Tile.FLOWER_RED], [7, 14, Tile.FLOWER_YELLOW], [9, 26, Tile.FLOWER_RED],
    [12, 16, Tile.FLOWER_YELLOW], [13, 30, Tile.FLOWER_RED], [16, 8, Tile.FLOWER_YELLOW],
    [18, 26, Tile.FLOWER_RED], [22, 12, Tile.FLOWER_YELLOW], [23, 28, Tile.FLOWER_RED],
    [24, 10, Tile.FLOWER_YELLOW], [25, 20, Tile.FLOWER_RED], [6, 22, Tile.FLOWER_YELLOW],
    [18, 8, Tile.FLOWER_RED],
  ];
  for (const [r, c, tile] of flowerPositions) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS && map[r][c] === Tile.GRASS) {
      map[r][c] = tile;
    }
  }
}

function placeTallGrass(map: Tile[][]): void {
  const positions = [
    [7, 18], [9, 22], [11, 14], [13, 8], [15, 30],
    [18, 14], [22, 26], [24, 18], [26, 10], [16, 24],
  ];
  for (const [r, c] of positions) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS && map[r][c] === Tile.GRASS) {
      map[r][c] = Tile.TALL_GRASS;
    }
  }
}

function placePond(map: Tile[][]): void {
  // Small pond at center-east area (cols 33-36, rows 11-13)
  // With a bridge at row 12, col 33
  const pondTiles: [number, number][] = [
    [11, 34], [11, 35], [11, 36],
    [12, 34], [12, 35], [12, 36],
    [13, 34], [13, 35], [13, 36],
    [12, 33],
  ];
  for (const [r, c] of pondTiles) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS) {
      map[r][c] = Tile.WATER;
    }
  }
  // Bridge over the pond
  map[12][33] = Tile.BRIDGE;
  map[11][33] = Tile.BRIDGE;
}

function placeSignpost(map: Tile[][]): void {
  // Signpost at center spawn area
  map[14][20] = Tile.SIGNPOST;
}

function placeFences(map: Tile[][]): void {
  // Small fence around the central plaza (partial)
  const fencePositions = [
    [12, 17], [12, 18], [12, 22], [12, 23],
    [18, 17], [18, 18], [18, 22], [18, 23],
  ];
  for (const [r, c] of fencePositions) {
    if (r >= 0 && r < MAP_ROWS && c >= 0 && c < MAP_COLS && map[r][c] === Tile.GRASS) {
      map[r][c] = Tile.FENCE;
    }
  }
}

function buildMap(): Tile[][] {
  const map = createBaseMap();
  placePaths(map);
  placeBuildings(map);
  placeTrees(map);
  placeFlowers(map);
  placeTallGrass(map);
  placePond(map);
  placeSignpost(map);
  placeFences(map);
  return map;
}

export const WORLD_MAP: Tile[][] = buildMap();

export function isSolid(tileX: number, tileY: number): boolean {
  if (tileX < 0 || tileX >= MAP_COLS || tileY < 0 || tileY >= MAP_ROWS) {
    return true;
  }
  return SOLID_TILES.has(WORLD_MAP[tileY][tileX]);
}

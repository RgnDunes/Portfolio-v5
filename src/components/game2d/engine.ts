import {
  TILE_SIZE,
  MAP_COLS,
  MAP_ROWS,
  BUILDINGS,
  NPCS,
  GEMS,
  isSolid,
} from "./world";

// ─── Types ──────────────────────────────────────────────────

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  interactJustPressed: boolean;
  sprint: boolean;
}

export interface GameState {
  player: {
    x: number;
    y: number;
    direction: string;
    isMoving: boolean;
    animFrame: number;
    animTimer: number;
    speed: number;
  };
  camera: {
    x: number;
    y: number;
  };
  input: InputState;
  gems: {
    collected: Set<string>;
    score: number;
  };
  npcs: {
    activeSpeech: {
      npcId: string;
      lines: string[];
      lineIndex: number;
      charProgress: number;
    } | null;
  };
  buildings: {
    nearDoor: string | null;
    exploredSet: Set<string>;
  };
  time: {
    elapsed: number;
  };
  ui: {
    toastMessage: string | null;
    toastTimer: number;
    toastColor: string;
  };
}

// ─── Constants ──────────────────────────────────────────────

const PLAYER_SPEED = 120; // pixels per second
const SPRINT_MULTIPLIER = 1.8;
const ANIM_INTERVAL = 0.18; // seconds between frames
const CAMERA_LERP = 5;
const GEM_COLLECT_DIST = 20; // pixels
const DOOR_INTERACT_DIST = 40;
const NPC_INTERACT_DIST = 48;
const TYPEWRITER_SPEED = 30; // chars per second

// Player hitbox (at player's feet)
const HITBOX_W = 20;
const HITBOX_H = 12;
const HITBOX_OFFSET_X = 6; // from player x
const HITBOX_OFFSET_Y = 20; // from player y

// ─── Initial State ──────────────────────────────────────────

export function createInitialState(): GameState {
  const spawnX = 20 * TILE_SIZE;
  const spawnY = 15 * TILE_SIZE;
  return {
    player: {
      x: spawnX,
      y: spawnY,
      direction: "down",
      isMoving: false,
      animFrame: 0,
      animTimer: 0,
      speed: PLAYER_SPEED,
    },
    camera: {
      x: spawnX,
      y: spawnY,
    },
    input: {
      up: false,
      down: false,
      left: false,
      right: false,
      interact: false,
      interactJustPressed: false,
      sprint: false,
    },
    gems: {
      collected: new Set(),
      score: 0,
    },
    npcs: {
      activeSpeech: null,
    },
    buildings: {
      nearDoor: null,
      exploredSet: new Set(),
    },
    time: {
      elapsed: 0,
    },
    ui: {
      toastMessage: null,
      toastTimer: 0,
      toastColor: "#ffffff",
    },
  };
}

// ─── Input Setup ────────────────────────────────────────────

export function setupInput(): {
  getInput: () => InputState;
  cleanup: () => void;
} {
  const keys: Record<string, boolean> = {};
  let interactJustPressed = false;
  let prevInteract = false;

  const onKeyDown = (e: KeyboardEvent) => {
    keys[e.key.toLowerCase()] = true;
    // Prevent default for game keys to avoid scrolling
    if (
      ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", " ", "e"].includes(
        e.key.toLowerCase()
      )
    ) {
      e.preventDefault();
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    keys[e.key.toLowerCase()] = false;
  };

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  const getInput = (): InputState => {
    const up = !!(keys["w"] || keys["arrowup"]);
    const down = !!(keys["s"] || keys["arrowdown"]);
    const left = !!(keys["a"] || keys["arrowleft"]);
    const right = !!(keys["d"] || keys["arrowright"]);
    const interact = !!(keys["e"] || keys[" "]);
    const sprint = !!(keys["shift"]);

    interactJustPressed = interact && !prevInteract;
    prevInteract = interact;

    return {
      up,
      down,
      left,
      right,
      interact,
      interactJustPressed,
      sprint,
    };
  };

  const cleanup = () => {
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };

  return { getInput, cleanup };
}

// ─── Collision Check ────────────────────────────────────────

function canMoveTo(px: number, py: number): boolean {
  // Check all four corners of the player's foot hitbox
  const left = px + HITBOX_OFFSET_X;
  const right = px + HITBOX_OFFSET_X + HITBOX_W - 1;
  const top = py + HITBOX_OFFSET_Y;
  const bottom = py + HITBOX_OFFSET_Y + HITBOX_H - 1;

  const tileLeft = Math.floor(left / TILE_SIZE);
  const tileRight = Math.floor(right / TILE_SIZE);
  const tileTop = Math.floor(top / TILE_SIZE);
  const tileBottom = Math.floor(bottom / TILE_SIZE);

  for (let ty = tileTop; ty <= tileBottom; ty++) {
    for (let tx = tileLeft; tx <= tileRight; tx++) {
      if (isSolid(tx, ty)) {
        return false;
      }
    }
  }
  return true;
}

// ─── Distance helper ────────────────────────────────────────

function dist(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

// ─── Toast helper ───────────────────────────────────────────

function showToast(
  state: GameState,
  message: string,
  color: string = "#ffffff"
): void {
  state.ui.toastMessage = message;
  state.ui.toastTimer = 2.5;
  state.ui.toastColor = color;
}

// ─── Update ─────────────────────────────────────────────────

export function update(
  state: GameState,
  dt: number,
  viewportW: number,
  viewportH: number
): { state: GameState; sectionToOpen: string | null; wantsExit: boolean } {
  let sectionToOpen: string | null = null;
  const wantsExit = !!(state.input.up && state.input.down && state.input.left && state.input.right);

  // Advance time
  state.time.elapsed += dt;

  // ── Toast timer ──
  if (state.ui.toastTimer > 0) {
    state.ui.toastTimer -= dt;
    if (state.ui.toastTimer <= 0) {
      state.ui.toastMessage = null;
      state.ui.toastTimer = 0;
    }
  }

  // ── NPC speech ──
  if (state.npcs.activeSpeech) {
    const speech = state.npcs.activeSpeech;
    // Advance typewriter
    speech.charProgress += TYPEWRITER_SPEED * dt;
    const currentLine = speech.lines[speech.lineIndex];

    if (state.input.interactJustPressed) {
      if (speech.charProgress >= currentLine.length) {
        // Advance to next line or close
        if (speech.lineIndex < speech.lines.length - 1) {
          speech.lineIndex++;
          speech.charProgress = 0;
        } else {
          state.npcs.activeSpeech = null;
        }
      } else {
        // Show full line immediately
        speech.charProgress = currentLine.length;
      }
    }

    // Don't process movement while in dialogue
    return { state, sectionToOpen, wantsExit: false };
  }

  // ── Movement ──
  const input = state.input;
  const speed =
    state.player.speed * (input.sprint ? SPRINT_MULTIPLIER : 1) * dt;
  let dx = 0;
  let dy = 0;

  if (input.left) dx -= 1;
  if (input.right) dx += 1;
  if (input.up) dy -= 1;
  if (input.down) dy += 1;

  // Normalize diagonal movement
  if (dx !== 0 && dy !== 0) {
    const inv = 1 / Math.sqrt(2);
    dx *= inv;
    dy *= inv;
  }

  const isMoving = dx !== 0 || dy !== 0;
  state.player.isMoving = isMoving;

  if (isMoving) {
    // Set direction
    if (Math.abs(dx) > Math.abs(dy)) {
      state.player.direction = dx > 0 ? "right" : "left";
    } else {
      state.player.direction = dy > 0 ? "down" : "up";
    }

    // Try to move with collision (try axis-separated for wall sliding)
    const newX = state.player.x + dx * speed;
    const newY = state.player.y + dy * speed;

    if (canMoveTo(newX, state.player.y)) {
      state.player.x = newX;
    }
    if (canMoveTo(state.player.x, newY)) {
      state.player.y = newY;
    }

    // Animation
    state.player.animTimer += dt;
    if (state.player.animTimer >= ANIM_INTERVAL) {
      state.player.animTimer -= ANIM_INTERVAL;
      state.player.animFrame = (state.player.animFrame + 1) % 2;
    }
  } else {
    state.player.animTimer = 0;
    state.player.animFrame = 0;
  }

  // ── Camera follow with lerp ──
  const targetCamX = state.player.x + TILE_SIZE / 2 - viewportW / 2;
  const targetCamY = state.player.y + TILE_SIZE / 2 - viewportH / 2;

  state.camera.x += (targetCamX - state.camera.x) * CAMERA_LERP * dt;
  state.camera.y += (targetCamY - state.camera.y) * CAMERA_LERP * dt;

  // Clamp camera to world bounds
  const maxCamX = MAP_COLS * TILE_SIZE - viewportW;
  const maxCamY = MAP_ROWS * TILE_SIZE - viewportH;
  state.camera.x = Math.max(0, Math.min(state.camera.x, maxCamX));
  state.camera.y = Math.max(0, Math.min(state.camera.y, maxCamY));

  // ── Gem collection ──
  const playerCenterX = state.player.x + TILE_SIZE / 2;
  const playerCenterY = state.player.y + TILE_SIZE / 2;

  for (const gem of GEMS) {
    if (state.gems.collected.has(gem.id)) continue;
    const gemPx = gem.tile.x * TILE_SIZE + TILE_SIZE / 2;
    const gemPy = gem.tile.y * TILE_SIZE + TILE_SIZE / 2;
    if (dist(playerCenterX, playerCenterY, gemPx, gemPy) < GEM_COLLECT_DIST) {
      state.gems.collected.add(gem.id);
      state.gems.score += gem.points;
      showToast(state, `+${gem.points} ${gem.label}`, gem.color);
    }
  }

  // ── Door proximity ──
  state.buildings.nearDoor = null;
  for (const building of BUILDINGS) {
    const doorPx = building.doorTile.x * TILE_SIZE + TILE_SIZE / 2;
    const doorPy = building.doorTile.y * TILE_SIZE + TILE_SIZE / 2;
    if (dist(playerCenterX, playerCenterY, doorPx, doorPy) < DOOR_INTERACT_DIST) {
      state.buildings.nearDoor = building.id;
      if (input.interactJustPressed) {
        sectionToOpen = building.id;
        state.buildings.exploredSet.add(building.id);
      }
      break;
    }
  }

  // ── NPC interaction ──
  if (input.interactJustPressed && !sectionToOpen) {
    for (const npc of NPCS) {
      const npcPx = npc.tile.x * TILE_SIZE + TILE_SIZE / 2;
      const npcPy = npc.tile.y * TILE_SIZE + TILE_SIZE / 2;
      if (dist(playerCenterX, playerCenterY, npcPx, npcPy) < NPC_INTERACT_DIST) {
        state.npcs.activeSpeech = {
          npcId: npc.id,
          lines: npc.dialogue,
          lineIndex: 0,
          charProgress: 0,
        };
        break;
      }
    }
  }

  return { state, sectionToOpen, wantsExit: false };
}

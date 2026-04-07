import {
  TILE_SIZE,
  MAP_COLS,
  MAP_ROWS,
  Tile,
  WORLD_MAP,
  BUILDINGS,
  NPCS,
  GEMS,
} from "./world";
import type { GameState } from "./engine";
import {
  drawPlayer,
  drawBuilding,
  drawTree,
  drawWater,
  drawGrass,
  drawSand,
  drawPath,
  drawFlower,
  drawNPC,
  drawGem,
  drawSpeechBubble,
  drawSignpost,
  drawFence,
  drawBridge,
  drawTallGrass,
} from "./sprites";

// ─── Text helpers ───────────────────────────────────────────

function drawTextShadow(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  font: string = "10px monospace"
) {
  ctx.font = font;
  ctx.fillStyle = "#000000";
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

// ─── Main render ────────────────────────────────────────────

export function render(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  state: GameState,
  frame: number,
  viewportW: number,
  viewportH: number
) {
  const camX = state.camera.x;
  const camY = state.camera.y;

  // Clear
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(0, 0, viewportW, viewportH);

  // Visible tile range
  const startCol = Math.max(0, Math.floor(camX / TILE_SIZE) - 1);
  const endCol = Math.min(MAP_COLS - 1, Math.ceil((camX + viewportW) / TILE_SIZE) + 1);
  const startRow = Math.max(0, Math.floor(camY / TILE_SIZE) - 1);
  const endRow = Math.min(MAP_ROWS - 1, Math.ceil((camY + viewportH) / TILE_SIZE) + 1);

  // ── Pass 1: Ground tiles ──
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const tile = WORLD_MAP[r][c];
      const sx = c * TILE_SIZE - camX;
      const sy = r * TILE_SIZE - camY;

      switch (tile) {
        case Tile.WATER:
          drawWater(ctx, sx, sy, frame);
          break;
        case Tile.SAND:
          drawSand(ctx, sx, sy);
          break;
        case Tile.GRASS:
          drawGrass(ctx, sx, sy, r * MAP_COLS + c);
          break;
        case Tile.PATH:
          drawPath(ctx, sx, sy);
          break;
        case Tile.FLOWER_RED:
          drawFlower(ctx, sx, sy, "#ef4444");
          break;
        case Tile.FLOWER_YELLOW:
          drawFlower(ctx, sx, sy, "#facc15");
          break;
        case Tile.TALL_GRASS:
          drawTallGrass(ctx, sx, sy, frame);
          break;
        case Tile.BRIDGE:
          drawBridge(ctx, sx, sy);
          break;
        case Tile.DOOR:
          drawPath(ctx, sx, sy);
          break;
        case Tile.BUILDING:
        case Tile.TREE:
        case Tile.SIGNPOST:
        case Tile.FENCE:
          // Draw grass underneath
          drawGrass(ctx, sx, sy, r * MAP_COLS + c);
          break;
      }
    }
  }

  // ── Pass 2: Sorted objects by Y position ──
  interface Renderable {
    y: number;
    draw: () => void;
  }

  const objects: Renderable[] = [];

  // Buildings
  for (const b of BUILDINGS) {
    const bx = b.roofArea.x * TILE_SIZE - camX;
    const by = b.roofArea.y * TILE_SIZE - camY;
    const bottomY = by + b.roofArea.h * TILE_SIZE;
    objects.push({
      y: bottomY,
      draw: () => drawBuilding(ctx, bx, by, b),
    });
  }

  // Trees, fences, signposts
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      const tile = WORLD_MAP[r][c];
      const sx = c * TILE_SIZE - camX;
      const sy = r * TILE_SIZE - camY;

      if (tile === Tile.TREE) {
        objects.push({
          y: sy + TILE_SIZE,
          draw: () => drawTree(ctx, sx, sy, r + c),
        });
      } else if (tile === Tile.FENCE) {
        objects.push({
          y: sy + TILE_SIZE,
          draw: () => drawFence(ctx, sx, sy),
        });
      } else if (tile === Tile.SIGNPOST) {
        objects.push({
          y: sy + TILE_SIZE,
          draw: () => drawSignpost(ctx, sx, sy),
        });
      }
    }
  }

  // NPCs
  for (const npc of NPCS) {
    const nx = npc.tile.x * TILE_SIZE - camX;
    const ny = npc.tile.y * TILE_SIZE - camY;
    objects.push({
      y: ny + TILE_SIZE,
      draw: () => drawNPC(ctx, nx, ny, npc, frame),
    });
  }

  // Gems
  for (const gem of GEMS) {
    if (state.gems.collected.has(gem.id)) continue;
    const gx = gem.tile.x * TILE_SIZE - camX;
    const gy = gem.tile.y * TILE_SIZE - camY;
    objects.push({
      y: gy + TILE_SIZE,
      draw: () => drawGem(ctx, gx, gy, gem.color, frame),
    });
  }

  // Player
  const px = state.player.x - camX;
  const py = state.player.y - camY;
  objects.push({
    y: py + TILE_SIZE,
    draw: () =>
      drawPlayer(
        ctx,
        px,
        py,
        state.player.direction,
        state.player.animFrame,
        state.player.isMoving
      ),
  });

  // Sort by Y and render
  objects.sort((a, b) => a.y - b.y);
  for (const obj of objects) {
    obj.draw();
  }

  // ── Interaction prompts ──
  if (state.buildings.nearDoor && !state.npcs.activeSpeech) {
    const building = BUILDINGS.find((b) => b.id === state.buildings.nearDoor);
    if (building) {
      const doorSx = building.doorTile.x * TILE_SIZE - camX + TILE_SIZE / 2;
      const doorSy = building.doorTile.y * TILE_SIZE - camY - 8;
      ctx.textAlign = "center";
      drawTextShadow(ctx, `[E] Enter ${building.label}`, doorSx, doorSy, "#fbbf24", "bold 10px monospace");
      ctx.textAlign = "left";
    }
  }

  // NPC interaction hint
  if (!state.npcs.activeSpeech && !state.buildings.nearDoor) {
    const playerCX = state.player.x + TILE_SIZE / 2;
    const playerCY = state.player.y + TILE_SIZE / 2;
    for (const npc of NPCS) {
      const npcPx = npc.tile.x * TILE_SIZE + TILE_SIZE / 2;
      const npcPy = npc.tile.y * TILE_SIZE + TILE_SIZE / 2;
      const dx = playerCX - npcPx;
      const dy = playerCY - npcPy;
      if (Math.sqrt(dx * dx + dy * dy) < 48) {
        const nsx = npc.tile.x * TILE_SIZE - camX + TILE_SIZE / 2;
        const nsy = npc.tile.y * TILE_SIZE - camY - 12;
        ctx.textAlign = "center";
        drawTextShadow(ctx, "[E] Talk", nsx, nsy, "#fbbf24", "bold 10px monospace");
        ctx.textAlign = "left";
        break;
      }
    }
  }

  // ── Speech bubbles ──
  if (state.npcs.activeSpeech) {
    const speech = state.npcs.activeSpeech;
    const npc = NPCS.find((n) => n.id === speech.npcId);
    if (npc) {
      const npcSx = npc.tile.x * TILE_SIZE - camX + TILE_SIZE / 2;
      const npcSy = npc.tile.y * TILE_SIZE - camY;
      const currentLine = speech.lines[speech.lineIndex];
      const chars = Math.min(
        Math.floor(speech.charProgress),
        currentLine.length
      );
      drawSpeechBubble(ctx, npcSx, npcSy, currentLine, chars);

      // Page indicator
      ctx.textAlign = "center";
      const indicator = `${speech.lineIndex + 1}/${speech.lines.length}`;
      drawTextShadow(
        ctx,
        chars >= currentLine.length ? "[E] Next" : "",
        npcSx,
        npcSy + 8,
        "#ffffff",
        "8px monospace"
      );
      drawTextShadow(ctx, indicator, npcSx, npcSy + 18, "#aaaaaa", "8px monospace");
      ctx.textAlign = "left";
    }
  }

  // ── Day/night tint overlay ──
  const dayLength = 120; // seconds per full day cycle
  const timeOfDay = (state.time.elapsed % dayLength) / dayLength;
  // Night is 0.0-0.2 and 0.8-1.0, day is 0.3-0.7
  let nightAlpha = 0;
  if (timeOfDay < 0.2) {
    nightAlpha = 0.3 * (1 - timeOfDay / 0.2);
  } else if (timeOfDay > 0.8) {
    nightAlpha = 0.3 * ((timeOfDay - 0.8) / 0.2);
  }
  if (nightAlpha > 0) {
    ctx.fillStyle = `rgba(20, 20, 60, ${nightAlpha})`;
    ctx.fillRect(0, 0, viewportW, viewportH);
  }

  // ── HUD ──
  drawHUD(ctx, state, viewportW, viewportH);

  // ── Minimap ──
  drawMinimap(ctx, state, viewportW);

  // ── Controls hint ──
  drawControlsHint(ctx, viewportW, viewportH);
}

// ─── HUD ────────────────────────────────────────────────────

function drawHUD(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  viewportW: number,
  _viewportH: number
) {
  // Background bar
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.fillRect(0, 0, viewportW, 32);

  // Score
  drawTextShadow(
    ctx,
    `Score: ${state.gems.score}`,
    10,
    20,
    "#fbbf24",
    "bold 12px monospace"
  );

  // Gems
  drawTextShadow(
    ctx,
    `Gems: ${state.gems.collected.size}/20`,
    140,
    20,
    "#60a5fa",
    "12px monospace"
  );

  // Explored
  drawTextShadow(
    ctx,
    `Explored: ${state.buildings.exploredSet.size}/6`,
    270,
    20,
    "#4ade80",
    "12px monospace"
  );

  // Toast notification
  if (state.ui.toastMessage && state.ui.toastTimer > 0) {
    const alpha = Math.min(1, state.ui.toastTimer / 0.5);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    const tw = ctx.measureText(state.ui.toastMessage).width + 30;
    const tx = viewportW / 2 - tw / 2;
    ctx.fillRect(tx, 44, tw, 28);
    drawTextShadow(
      ctx,
      state.ui.toastMessage,
      viewportW / 2 - ctx.measureText(state.ui.toastMessage).width / 2,
      63,
      state.ui.toastColor,
      "bold 12px monospace"
    );
    ctx.globalAlpha = 1;
  }
}

// ─── Minimap ────────────────────────────────────────────────

function drawMinimap(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  viewportW: number
) {
  const mmW = 120;
  const mmH = 90;
  const mmX = viewportW - mmW - 10;
  const mmY = 40;
  const scaleX = mmW / MAP_COLS;
  const scaleY = mmH / MAP_ROWS;

  // Background
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);

  // Tiles at reduced resolution
  for (let r = 0; r < MAP_ROWS; r++) {
    for (let c = 0; c < MAP_COLS; c++) {
      const tile = WORLD_MAP[r][c];
      let color: string;
      switch (tile) {
        case Tile.WATER:
          color = "#2563eb";
          break;
        case Tile.SAND:
          color = "#f4d58d";
          break;
        case Tile.GRASS:
        case Tile.TALL_GRASS:
        case Tile.FLOWER_RED:
        case Tile.FLOWER_YELLOW:
          color = "#4ade80";
          break;
        case Tile.PATH:
        case Tile.DOOR:
          color = "#c9a96e";
          break;
        case Tile.TREE:
          color = "#166534";
          break;
        case Tile.BUILDING:
          color = "#6b7280";
          break;
        case Tile.BRIDGE:
          color = "#a0714f";
          break;
        case Tile.SIGNPOST:
          color = "#deb887";
          break;
        case Tile.FENCE:
          color = "#8B5E3C";
          break;
        default:
          color = "#4ade80";
      }
      ctx.fillStyle = color;
      ctx.fillRect(
        mmX + c * scaleX,
        mmY + r * scaleY,
        Math.ceil(scaleX),
        Math.ceil(scaleY)
      );
    }
  }

  // Gem dots
  for (const gem of GEMS) {
    if (state.gems.collected.has(gem.id)) continue;
    ctx.fillStyle = gem.color;
    ctx.fillRect(
      mmX + gem.tile.x * scaleX,
      mmY + gem.tile.y * scaleY,
      3,
      3
    );
  }

  // Player dot
  const playerTileX = state.player.x / TILE_SIZE;
  const playerTileY = state.player.y / TILE_SIZE;
  ctx.fillStyle = "#facc15";
  ctx.fillRect(
    mmX + playerTileX * scaleX - 1,
    mmY + playerTileY * scaleY - 1,
    4,
    4
  );

  // Direction triangle (small indicator)
  const dirPx = mmX + playerTileX * scaleX + 1;
  const dirPy = mmY + playerTileY * scaleY + 1;
  ctx.fillStyle = "#ffffff";
  switch (state.player.direction) {
    case "up":
      ctx.fillRect(dirPx, dirPy - 3, 2, 2);
      break;
    case "down":
      ctx.fillRect(dirPx, dirPy + 3, 2, 2);
      break;
    case "left":
      ctx.fillRect(dirPx - 3, dirPy, 2, 2);
      break;
    case "right":
      ctx.fillRect(dirPx + 3, dirPy, 2, 2);
      break;
  }

  // Border
  ctx.strokeStyle = "rgba(255,255,255,0.3)";
  ctx.lineWidth = 1;
  ctx.strokeRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);
}

// ─── Controls Hint ──────────────────────────────────────────

function drawControlsHint(
  ctx: CanvasRenderingContext2D,
  viewportW: number,
  viewportH: number
) {
  const hint = "WASD: Move | E: Interact | Shift: Sprint | ESC: Exit";
  ctx.textAlign = "center";
  drawTextShadow(
    ctx,
    hint,
    viewportW / 2,
    viewportH - 10,
    "rgba(255,255,255,0.4)",
    "9px monospace"
  );
  ctx.textAlign = "left";
}

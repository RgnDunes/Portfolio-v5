import type { BuildingDef, NPCDef } from "./world";

// ─── Helpers ────────────────────────────────────────────────

function rect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), w, h);
}

// ─── 1. Player ──────────────────────────────────────────────

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  direction: string,
  frame: number,
  isMoving: boolean
) {
  const skin = "#f5c5a3";
  const hair = "#4a3728";
  const shirt = "#c84b31";
  const pants = "#2d3436";
  const shoes = "#1a1a2e";
  const legOffset = isMoving ? (frame % 2 === 0 ? 2 : -2) : 0;

  // Shadow
  rect(ctx, x + 6, y + 28, 20, 4, "rgba(0,0,0,0.2)");

  if (direction === "down" || direction === "up") {
    // Legs
    rect(ctx, x + 9, y + 22 + (isMoving ? legOffset : 0), 5, 6, pants);
    rect(ctx, x + 17, y + 22 + (isMoving ? -legOffset : 0), 5, 6, pants);
    // Shoes
    rect(ctx, x + 9, y + 27 + (isMoving ? legOffset : 0), 5, 3, shoes);
    rect(ctx, x + 17, y + 27 + (isMoving ? -legOffset : 0), 5, 3, shoes);
    // Body
    rect(ctx, x + 8, y + 12, 16, 11, shirt);
    // Head
    rect(ctx, x + 9, y + 2, 14, 12, skin);
    // Hair
    rect(ctx, x + 8, y + 1, 16, 5, hair);

    if (direction === "down") {
      // Eyes
      rect(ctx, x + 12, y + 7, 3, 3, "#2d3436");
      rect(ctx, x + 18, y + 7, 3, 3, "#2d3436");
      // Eye shine
      rect(ctx, x + 13, y + 7, 1, 1, "#ffffff");
      rect(ctx, x + 19, y + 7, 1, 1, "#ffffff");
      // Mouth
      rect(ctx, x + 14, y + 11, 4, 1, "#c0846d");
    }
    // Arms
    rect(ctx, x + 4, y + 13, 4, 8, shirt);
    rect(ctx, x + 24, y + 13, 4, 8, shirt);
    // Hands
    rect(ctx, x + 4, y + 20, 4, 3, skin);
    rect(ctx, x + 24, y + 20, 4, 3, skin);
  } else {
    // Side view (left or right)
    const flip = direction === "left";
    const ox = flip ? x + 22 : x + 6;
    const dir = flip ? -1 : 1;

    // Legs
    rect(ctx, ox + dir * 2, y + 22 + (isMoving ? legOffset : 0), 5, 6, pants);
    rect(ctx, ox + dir * 7, y + 22 + (isMoving ? -legOffset : 0), 5, 6, pants);
    rect(ctx, ox + dir * 2, y + 27 + (isMoving ? legOffset : 0), 5, 3, shoes);
    rect(ctx, ox + dir * 7, y + 27 + (isMoving ? -legOffset : 0), 5, 3, shoes);
    // Body
    rect(ctx, ox, y + 12, dir * 14, 11, shirt);
    // Head
    rect(ctx, ox + dir * 1, y + 2, dir * 12, 12, skin);
    // Hair
    rect(ctx, ox, y + 1, dir * 14, 5, hair);
    // Eye
    rect(ctx, ox + dir * 8, y + 7, 3, 3, "#2d3436");
    rect(ctx, ox + dir * 9, y + 7, 1, 1, "#ffffff");
    // Arm
    rect(ctx, ox + dir * 1, y + 13, 4, 9, shirt);
    rect(ctx, ox + dir * 1, y + 21, 4, 3, skin);
  }
}

// ─── 2. Building ────────────────────────────────────────────

export function drawBuilding(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  building: BuildingDef
) {
  const w = 128;
  const h = 96;

  // Walls
  rect(ctx, x + 4, y + 28, w - 8, h - 28, "#f5f0e8");
  // Wall shadow
  rect(ctx, x + 4, y + 28, w - 8, 3, "#e8e0d0");

  // Roof (triangular via stacked rects)
  const roofColor = building.color;
  const roofDark =
    roofColor + "cc";
  for (let i = 0; i < 20; i++) {
    const rw = w - i * 6;
    if (rw <= 0) break;
    const rx = x + (w - rw) / 2;
    rect(ctx, rx, y + 8 + i, rw, 2, i < 2 ? roofDark : roofColor);
  }
  // Roof edge
  rect(ctx, x, y + 28, w, 3, roofDark);

  // Windows (2 windows)
  rect(ctx, x + 16, y + 42, 18, 18, "#87ceeb");
  rect(ctx, x + 94, y + 42, 18, 18, "#87ceeb");
  // Window frames
  rect(ctx, x + 16, y + 50, 18, 2, "#d4c5a9");
  rect(ctx, x + 24, y + 42, 2, 18, "#d4c5a9");
  rect(ctx, x + 94, y + 50, 18, 2, "#d4c5a9");
  rect(ctx, x + 102, y + 42, 2, 18, "#d4c5a9");

  // Door
  rect(ctx, x + 52, y + 56, 24, 40, "#8B5E3C");
  rect(ctx, x + 54, y + 58, 20, 36, "#a0714f");
  // Doorknob
  rect(ctx, x + 70, y + 76, 3, 3, "#d4af37");

  // Sign above door
  rect(ctx, x + 38, y + 34, 52, 16, "#f5f0e8");
  rect(ctx, x + 38, y + 34, 52, 2, building.color);
  ctx.fillStyle = "#2d3436";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillText(building.label, x + 64, y + 46);
  ctx.textAlign = "left";

  // Icon circle on roof
  rect(ctx, x + 56, y + 10, 16, 16, "rgba(255,255,255,0.9)");
  ctx.fillStyle = building.color;
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  ctx.fillText(building.icon, x + 64, y + 23);
  ctx.textAlign = "left";
}

// ─── 3. Tree ────────────────────────────────────────────────

export function drawTree(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number
) {
  // Shadow
  rect(ctx, x + 6, y + 26, 20, 6, "rgba(0,0,0,0.15)");
  // Trunk
  rect(ctx, x + 12, y + 18, 8, 12, "#8B5E3C");
  rect(ctx, x + 14, y + 20, 4, 8, "#a0714f");

  if (variant % 2 === 0) {
    // Round canopy
    rect(ctx, x + 4, y + 2, 24, 18, "#2d8a4e");
    rect(ctx, x + 6, y + 0, 20, 4, "#34a853");
    rect(ctx, x + 8, y + 4, 16, 6, "#3cc060");
  } else {
    // Pointy canopy
    rect(ctx, x + 8, y + 8, 16, 12, "#2d8a4e");
    rect(ctx, x + 10, y + 4, 12, 8, "#34a853");
    rect(ctx, x + 12, y + 0, 8, 6, "#3cc060");
    rect(ctx, x + 14, y + -1, 4, 3, "#34a853");
  }
}

// ─── 4. Water ───────────────────────────────────────────────

export function drawWater(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
) {
  rect(ctx, x, y, 32, 32, "#2563eb");
  // Animated wave lines
  const waveOffset = Math.floor(frame / 15) % 4;
  ctx.fillStyle = "#3b82f6";
  for (let i = 0; i < 3; i++) {
    const wy = y + 6 + i * 10 + ((waveOffset + i) % 3);
    rect(ctx, x + 4 + ((i * 7 + waveOffset * 3) % 12), wy, 14, 2, "#3b82f6");
  }
  // Highlight
  rect(ctx, x + 2 + (waveOffset % 3) * 4, y + 3, 6, 1, "#60a5fa");
}

// ─── 5. Grass ───────────────────────────────────────────────

export function drawGrass(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number
) {
  rect(ctx, x, y, 32, 32, "#4ade80");
  // Texture dots
  const hash = ((variant * 7 + 13) * 37) % 100;
  rect(ctx, x + (hash % 20) + 4, y + (hash % 15) + 4, 2, 2, "#3ec96e");
  rect(ctx, x + ((hash * 3) % 22) + 2, y + ((hash * 5) % 18) + 8, 2, 2, "#5ae890");
  rect(ctx, x + ((hash * 7) % 24) + 1, y + ((hash * 2) % 20) + 2, 1, 2, "#38b866");
}

// ─── 6. Sand ────────────────────────────────────────────────

export function drawSand(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  rect(ctx, x, y, 32, 32, "#f4d58d");
  // Texture dots
  rect(ctx, x + 8, y + 6, 2, 1, "#e8c770");
  rect(ctx, x + 20, y + 14, 2, 1, "#e8c770");
  rect(ctx, x + 12, y + 24, 1, 1, "#e0bf60");
}

// ─── 7. Path ────────────────────────────────────────────────

export function drawPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  rect(ctx, x, y, 32, 32, "#c9a96e");
  // Stone marks
  rect(ctx, x + 5, y + 8, 6, 4, "#b89a5e");
  rect(ctx, x + 18, y + 4, 8, 5, "#bfa668");
  rect(ctx, x + 10, y + 20, 7, 5, "#b89a5e");
  rect(ctx, x + 22, y + 22, 5, 4, "#bfa668");
}

// ─── 8. Flower ──────────────────────────────────────────────

export function drawFlower(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
) {
  // Grass base
  drawGrass(ctx, x, y, 99);
  // Stem
  rect(ctx, x + 15, y + 14, 2, 10, "#2d8a4e");
  // Petals
  rect(ctx, x + 12, y + 10, 3, 4, color);
  rect(ctx, x + 17, y + 10, 3, 4, color);
  rect(ctx, x + 14, y + 8, 4, 3, color);
  rect(ctx, x + 14, y + 14, 4, 3, color);
  // Center
  rect(ctx, x + 15, y + 11, 2, 2, "#fbbf24");
}

// ─── 9. NPC ─────────────────────────────────────────────────

export function drawNPC(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  npc: NPCDef,
  frame: number
) {
  const skin = npc.skinColor;
  const shirtColor = npc.shirtColor;
  const pants = "#4a5568";
  const shoes = "#2d3436";

  // Idle bob
  const bob = Math.floor(frame / 30) % 2 === 0 ? 0 : -1;

  // Shadow
  rect(ctx, x + 6, y + 28, 20, 4, "rgba(0,0,0,0.2)");

  // Legs
  rect(ctx, x + 9, y + 22, 5, 6, pants);
  rect(ctx, x + 17, y + 22, 5, 6, pants);
  rect(ctx, x + 9, y + 27, 5, 3, shoes);
  rect(ctx, x + 17, y + 27, 5, 3, shoes);

  // Body
  rect(ctx, x + 8, y + 12 + bob, 16, 11, shirtColor);

  // Head
  rect(ctx, x + 9, y + 2 + bob, 14, 12, skin);

  // Hair/hat (NPCs get a hat)
  rect(ctx, x + 7, y + 0 + bob, 18, 5, shirtColor);
  rect(ctx, x + 9, y + -1 + bob, 14, 3, shirtColor);

  if (npc.direction === "down" || npc.direction === "up") {
    if (npc.direction === "down") {
      // Eyes
      rect(ctx, x + 12, y + 7 + bob, 3, 3, "#2d3436");
      rect(ctx, x + 18, y + 7 + bob, 3, 3, "#2d3436");
      rect(ctx, x + 13, y + 7 + bob, 1, 1, "#ffffff");
      rect(ctx, x + 19, y + 7 + bob, 1, 1, "#ffffff");
    }
    // Arms
    rect(ctx, x + 4, y + 13 + bob, 4, 8, shirtColor);
    rect(ctx, x + 24, y + 13 + bob, 4, 8, shirtColor);
    rect(ctx, x + 4, y + 20 + bob, 4, 3, skin);
    rect(ctx, x + 24, y + 20 + bob, 4, 3, skin);
  } else {
    const flip = npc.direction === "left";
    const ox = flip ? x + 22 : x + 6;
    const dir = flip ? -1 : 1;
    // Eye
    rect(ctx, ox + dir * 8, y + 7 + bob, 3, 3, "#2d3436");
    rect(ctx, ox + dir * 9, y + 7 + bob, 1, 1, "#ffffff");
    // Arm
    rect(ctx, ox + dir * 1, y + 13 + bob, 4, 9, shirtColor);
    rect(ctx, ox + dir * 1, y + 21 + bob, 4, 3, skin);
  }

  // Name tag above head
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.font = "8px monospace";
  ctx.textAlign = "center";
  ctx.fillText(npc.name, x + 17, y - 3 + bob);
  ctx.fillStyle = "#ffffff";
  ctx.fillText(npc.name, x + 16, y - 4 + bob);
  ctx.textAlign = "left";
}

// ─── 10. Gem ────────────────────────────────────────────────

export function drawGem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  frame: number
) {
  // Bobbing animation
  const bob = Math.sin(frame * 0.08) * 3;
  const gy = y + 8 + bob;

  // Shadow
  const shadowSize = 8 + Math.sin(frame * 0.08) * 2;
  rect(ctx, x + 16 - shadowSize / 2, y + 26, shadowSize, 3, "rgba(0,0,0,0.15)");

  // Diamond shape via stacked rects
  rect(ctx, x + 14, y + 6 + bob, 4, 2, color);
  rect(ctx, x + 12, y + 8 + bob, 8, 2, color);
  rect(ctx, x + 10, y + 10 + bob, 12, 4, color);
  rect(ctx, x + 12, y + 14 + bob, 8, 2, color);
  rect(ctx, x + 14, y + 16 + bob, 4, 2, color);

  // Highlight
  rect(ctx, x + 13, gy + 1, 2, 2, "rgba(255,255,255,0.7)");

  // Sparkle
  const sparkPhase = (frame * 3) % 60;
  if (sparkPhase < 10) {
    const sx = x + 8 + (sparkPhase % 5) * 4;
    const sy = gy - 4 + (sparkPhase % 3) * 2;
    rect(ctx, sx, sy, 2, 2, "#ffffff");
  }
}

// ─── 11. Speech Bubble ──────────────────────────────────────

export function drawSpeechBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  maxChars: number
) {
  const displayText = text.substring(0, maxChars);
  ctx.font = "10px monospace";
  const metrics = ctx.measureText(displayText);
  const tw = Math.max(metrics.width + 20, 60);
  const th = 28;
  const bx = x - tw / 2;
  const by = y - th - 10;

  // Bubble background
  rect(ctx, bx, by, tw, th, "#ffffff");
  rect(ctx, bx + 1, by + 1, tw - 2, th - 2, "#fafafa");
  // Border
  rect(ctx, bx, by, tw, 1, "#d1d5db");
  rect(ctx, bx, by + th - 1, tw, 1, "#d1d5db");
  rect(ctx, bx, by, 1, th, "#d1d5db");
  rect(ctx, bx + tw - 1, by, 1, th, "#d1d5db");

  // Tail
  rect(ctx, x - 4, by + th, 8, 4, "#ffffff");
  rect(ctx, x - 2, by + th + 4, 4, 3, "#ffffff");

  // Text (shadow + text)
  ctx.fillStyle = "#1a1a2e";
  ctx.textAlign = "center";
  ctx.fillText(displayText, x, by + 18);
  ctx.textAlign = "left";
}

// ─── 12. Signpost ───────────────────────────────────────────

export function drawSignpost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  // Shadow
  rect(ctx, x + 10, y + 26, 12, 4, "rgba(0,0,0,0.15)");
  // Post
  rect(ctx, x + 14, y + 12, 4, 18, "#8B5E3C");
  // Sign board
  rect(ctx, x + 4, y + 4, 24, 12, "#deb887");
  rect(ctx, x + 5, y + 5, 22, 10, "#f0d9a0");
  // Text
  ctx.fillStyle = "#4a3728";
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.fillText("INFO", x + 16, y + 13);
  ctx.textAlign = "left";
}

// ─── 13. Fence ──────────────────────────────────────────────

export function drawFence(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  // Horizontal bar
  rect(ctx, x, y + 10, 32, 4, "#c9a96e");
  rect(ctx, x, y + 20, 32, 4, "#c9a96e");
  // Vertical posts
  rect(ctx, x + 2, y + 6, 4, 22, "#8B5E3C");
  rect(ctx, x + 14, y + 6, 4, 22, "#8B5E3C");
  rect(ctx, x + 26, y + 6, 4, 22, "#8B5E3C");
  // Post tops (pointed)
  rect(ctx, x + 3, y + 4, 2, 3, "#a0714f");
  rect(ctx, x + 15, y + 4, 2, 3, "#a0714f");
  rect(ctx, x + 27, y + 4, 2, 3, "#a0714f");
}

// ─── 14. Bridge ─────────────────────────────────────────────

export function drawBridge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  // Water underneath
  rect(ctx, x, y, 32, 32, "#2563eb");
  // Planks
  for (let i = 0; i < 4; i++) {
    const py = y + 2 + i * 8;
    rect(ctx, x + 2, py, 28, 6, "#c9a96e");
    rect(ctx, x + 2, py + 6, 28, 1, "#a08050");
  }
  // Railings
  rect(ctx, x, y, 3, 32, "#8B5E3C");
  rect(ctx, x + 29, y, 3, 32, "#8B5E3C");
}

// ─── 15. Tall Grass ─────────────────────────────────────────

export function drawTallGrass(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  frame: number
) {
  // Base grass
  rect(ctx, x, y, 32, 32, "#4ade80");

  // Sway offset
  const sway = Math.sin(frame * 0.05) * 2;

  // Tall blades
  const bladeColor1 = "#22c55e";
  const bladeColor2 = "#16a34a";
  for (let i = 0; i < 6; i++) {
    const bx = x + 3 + i * 5;
    const bladeH = 12 + (i % 3) * 3;
    const swayOff = sway * ((i % 3 === 0) ? 1 : -0.5);
    rect(ctx, bx + swayOff, y + 32 - bladeH, 2, bladeH, i % 2 === 0 ? bladeColor1 : bladeColor2);
    // Tip
    rect(ctx, bx - 1 + swayOff, y + 32 - bladeH - 2, 4, 2, bladeColor1);
  }
}

"use client";

import { useCallback, useMemo, useRef } from "react";
import * as THREE from "three";

export default function Terrain() {
  return (
    <group>
      {/* Main ground */}
      <GrassGround />
      {/* Lake */}
      <Lake />
      {/* Mountains (distant) */}
      <Mountains />
      {/* Flowers and rocks scattered */}
      <Decorations />
    </group>
  );
}

function GrassGround() {
  const count = 181 * 181;

  const initMesh = useCallback((mesh: THREE.InstancedMesh) => {
    if (!mesh) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    let i = 0;

    for (let x = -90; x <= 90; x++) {
      for (let z = -90; z <= 90; z++) {
        const distFromLake = Math.sqrt((x - 10) ** 2 + (z - 20) ** 2);
        if (distFromLake < 15) {
          matrix.setPosition(x, -1, z);
          mesh.setMatrixAt(i, matrix);
          color.setRGB(0.15, 0.25, 0.35);
          mesh.setColorAt(i, color);
          i++;
          continue;
        }

        const noise = Math.sin(x * 0.15) * Math.cos(z * 0.15) * 0.2;
        matrix.setPosition(x, noise - 0.5, z);
        mesh.setMatrixAt(i, matrix);

        const shade = 0.6 + Math.random() * 0.4;
        const isBeach = distFromLake < 18;
        if (isBeach) {
          color.setRGB(0.6 * shade, 0.55 * shade, 0.35 * shade);
        } else {
          color.setRGB(0.2 * shade, 0.5 * shade, 0.15 * shade);
        }
        mesh.setColorAt(i, color);
        i++;
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={initMesh} args={[undefined, undefined, count]} receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
}

function Lake() {
  return (
    <group position={[10, 0, 20]}>
      {/* Water surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <circleGeometry args={[14, 32]} />
        <meshStandardMaterial
          color="#3a7bc8"
          transparent
          opacity={0.65}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
      {/* Lily pads */}
      {[[-3, 4], [5, -2], [-6, -5], [2, 7], [8, 3]].map(([x, z], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]} position={[x, 0.08, z]}>
          <circleGeometry args={[0.5, 8]} />
          <meshStandardMaterial color="#2d5a1e" />
        </mesh>
      ))}
    </group>
  );
}

function Mountains() {
  return (
    <group>
      {/* Far mountains */}
      {[
        [-60, 0, -85, 30, 25],
        [-30, 0, -90, 25, 20],
        [0, 0, -88, 35, 30],
        [35, 0, -85, 28, 22],
        [65, 0, -90, 32, 28],
        [-80, 0, -80, 20, 18],
        [80, 0, -82, 22, 20],
      ].map(([x, y, z, w, h], i) => (
        <mesh key={i} position={[x, h / 2 - 2, z]}>
          <boxGeometry args={[w, h, w * 0.6]} />
          <meshStandardMaterial color={`hsl(${200 + i * 10}, 15%, ${35 + i * 3}%)`} />
        </mesh>
      ))}
      {/* Snow caps */}
      {[
        [0, 26, -88, 12],
        [-60, 21, -85, 10],
        [35, 18, -85, 8],
        [65, 24, -90, 10],
      ].map(([x, y, z, w], i) => (
        <mesh key={`snow-${i}`} position={[x, y, z]}>
          <boxGeometry args={[w, 4, w * 0.5]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>
      ))}
    </group>
  );
}

function Decorations() {
  const items = useMemo(() => {
    const result: { type: string; x: number; z: number }[] = [];
    const rng = (s: number) => {
      const x = Math.sin(s * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 80; i++) {
      const x = (rng(i * 7) - 0.5) * 160;
      const z = (rng(i * 7 + 1) - 0.5) * 160;
      const distFromLake = Math.sqrt((x - 10) ** 2 + (z - 20) ** 2);
      if (distFromLake < 18) continue;
      result.push({ type: rng(i * 7 + 2) > 0.5 ? "rock" : "flower", x, z });
    }
    return result;
  }, []);

  return (
    <group>
      {items.map((item, i) =>
        item.type === "rock" ? (
          <mesh key={i} position={[item.x, 0.2, item.z]} castShadow>
            <boxGeometry args={[0.5 + Math.random() * 0.5, 0.4, 0.5 + Math.random() * 0.3]} />
            <meshStandardMaterial color={`hsl(0, 0%, ${45 + Math.random() * 20}%)`} />
          </mesh>
        ) : (
          <mesh key={i} position={[item.x, 0.3, item.z]}>
            <boxGeometry args={[0.2, 0.4, 0.2]} />
            <meshStandardMaterial
              color={["#ff6b6b", "#ffd93d", "#c084fc", "#60a5fa", "#f472b6"][i % 5]}
            />
          </mesh>
        )
      )}
    </group>
  );
}

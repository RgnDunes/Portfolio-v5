"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";

// Generate a Minecraft-style flat terrain with block-like grass
export default function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create blocky terrain chunks
  const blocks = useMemo(() => {
    const result: { x: number; z: number; y: number; color: string }[] = [];
    const size = 40;

    for (let x = -size; x <= size; x += 1) {
      for (let z = -size; z <= size; z += 1) {
        // Slight height variation for natural look
        const noise = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.3;
        const y = Math.floor(noise * 2) * 0.5;

        // Color variation for grass
        const shade = 0.7 + Math.random() * 0.3;
        const r = Math.floor(76 * shade);
        const g = Math.floor(153 * shade);
        const b = Math.floor(0 * shade + 30);
        result.push({ x, z, y: y - 0.5, color: `rgb(${r},${g},${b})` });
      }
    }
    return result;
  }, []);

  // Use instanced mesh for performance
  const grassGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

  return (
    <group>
      {/* Base ground plane (for areas without blocks) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#3d6b1e" />
      </mesh>

      {/* Grass blocks - use instanced mesh for performance */}
      <GrassBlocks />

      {/* Path (lighter blocks leading to buildings) */}
      <Path />
    </group>
  );
}

function GrassBlocks() {
  const count = 81 * 81; // 40*2+1 squared
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useMemo(() => {
    if (!meshRef.current) return;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    let i = 0;

    for (let x = -40; x <= 40; x++) {
      for (let z = -40; z <= 40; z++) {
        const noise = Math.sin(x * 0.3) * Math.cos(z * 0.3) * 0.3;
        const y = Math.floor(noise * 2) * 0.5 - 0.5;
        matrix.setPosition(x, y, z);
        meshRef.current.setMatrixAt(i, matrix);

        const shade = 0.65 + Math.random() * 0.35;
        color.setRGB(0.3 * shade, 0.6 * shade, 0.12 * shade);
        meshRef.current.setColorAt(i, color);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [meshRef.current]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} receiveShadow castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial vertexColors />
    </instancedMesh>
  );
}

function Path() {
  const blocks = useMemo(() => {
    const result: [number, number, number][] = [];
    // Main path from spawn to center
    for (let z = 14; z >= -5; z--) {
      result.push([0, 0, z]);
      result.push([1, 0, z]);
    }
    // Branches to buildings
    // Left branch
    for (let x = -1; x >= -12; x--) {
      result.push([x, 0, -2]);
      result.push([x, 0, -3]);
    }
    // Right branch
    for (let x = 2; x <= 12; x++) {
      result.push([x, 0, -2]);
      result.push([x, 0, -3]);
    }
    // Forward branch
    for (let z = -6; z >= -20; z--) {
      result.push([0, 0, z]);
      result.push([1, 0, z]);
    }
    return result;
  }, []);

  return (
    <group>
      {blocks.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y + 0.01, z]} receiveShadow>
          <boxGeometry args={[1, 0.2, 1]} />
          <meshStandardMaterial color="#c4a76c" />
        </mesh>
      ))}
    </group>
  );
}

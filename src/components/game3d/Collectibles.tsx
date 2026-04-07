"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const GEMS = [
  { id: "react-1", label: "React", color: "#61dafb", position: [-15, 1.5, 5] as [number, number, number] },
  { id: "ts-1", label: "TypeScript", color: "#3178c6", position: [20, 1.5, -8] as [number, number, number] },
  { id: "js-1", label: "JavaScript", color: "#f7df1e", position: [-30, 1.5, -25] as [number, number, number] },
  { id: "css-1", label: "CSS", color: "#264de4", position: [15, 1.5, -35] as [number, number, number] },
  { id: "node-1", label: "Node.js", color: "#68a063", position: [-45, 1.5, 15] as [number, number, number] },
  { id: "next-1", label: "Next.js", color: "#ffffff", position: [25, 1.5, 25] as [number, number, number] },
  { id: "docker-1", label: "Docker", color: "#2496ed", position: [-60, 1.5, -30] as [number, number, number] },
  { id: "aws-1", label: "AWS", color: "#ff9900", position: [50, 1.5, -35] as [number, number, number] },
  { id: "git-1", label: "Git", color: "#f05032", position: [-20, 1.5, -45] as [number, number, number] },
  { id: "redux-1", label: "Redux", color: "#764abc", position: [30, 1.5, 10] as [number, number, number] },
  { id: "webpack-1", label: "Webpack", color: "#8dd6f9", position: [-50, 1.5, -55] as [number, number, number] },
  { id: "graphql-1", label: "GraphQL", color: "#e535ab", position: [55, 1.5, 0] as [number, number, number] },
  { id: "tailwind-1", label: "Tailwind", color: "#06b6d4", position: [-10, 1.5, 30] as [number, number, number] },
  { id: "jest-1", label: "Jest", color: "#c21325", position: [45, 1.5, -50] as [number, number, number] },
  { id: "vue-1", label: "Vue", color: "#42b883", position: [-35, 1.5, 5] as [number, number, number] },
  { id: "python-1", label: "Python", color: "#3776ab", position: [60, 1.5, -20] as [number, number, number] },
  { id: "rust-1", label: "Rust", color: "#dea584", position: [-55, 1.5, 25] as [number, number, number] },
  { id: "k8s-1", label: "Kubernetes", color: "#326ce5", position: [20, 1.5, -55] as [number, number, number] },
  { id: "mongo-1", label: "MongoDB", color: "#47a248", position: [-40, 1.5, -65] as [number, number, number] },
  { id: "redis-1", label: "Redis", color: "#dc382d", position: [35, 1.5, -25] as [number, number, number] },
  { id: "vite-1", label: "Vite", color: "#646cff", position: [-15, 1.5, -70] as [number, number, number] },
  { id: "html-1", label: "HTML", color: "#e34f26", position: [10, 1.5, 15] as [number, number, number] },
  { id: "sass-1", label: "Sass", color: "#cc6699", position: [-65, 1.5, -10] as [number, number, number] },
  { id: "cypress-1", label: "Cypress", color: "#17202c", position: [65, 1.5, -40] as [number, number, number] },
  { id: "rollup-1", label: "Rollup", color: "#ec4a3f", position: [-25, 1.5, 40] as [number, number, number] },
];

interface GemProps {
  id: string;
  label: string;
  color: string;
  position: [number, number, number];
  playerPosition: [number, number, number];
  onCollect: (gem: { id: string; label: string; points: number }, position: [number, number, number], color: string) => void;
  collected: boolean;
}

function Gem({ id, label, color, position, playerPosition, onCollect, collected }: GemProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [collecting, setCollecting] = useState(false);
  const collectProgress = useRef(0);
  const baseY = position[1];

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (collected && !collecting) return;

    if (collecting) {
      collectProgress.current += delta * 4;
      if (collectProgress.current < 0.5) {
        const s = 1 + collectProgress.current * 2;
        meshRef.current.scale.setScalar(s);
      } else {
        const s = Math.max(0, 2 - (collectProgress.current - 0.5) * 4);
        meshRef.current.scale.setScalar(s);
      }
      if (collectProgress.current >= 1) {
        meshRef.current.visible = false;
      }
      return;
    }

    // Rotate
    meshRef.current.rotation.y += delta * 2;

    // Bob
    const time = Date.now() * 0.002;
    meshRef.current.position.y = baseY + Math.sin(time + position[0]) * 0.3;

    // Check distance to player
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 2) {
      setCollecting(true);
      collectProgress.current = 0;
      onCollect(
        { id, label, points: 10 },
        position,
        color
      );
    }
  });

  if (collected && !collecting) return null;

  return (
    <group>
      <mesh
        ref={meshRef}
        position={[position[0], position[1], position[2]]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Outer glow shell */}
      <mesh position={[position[0], position[1], position[2]]}>
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      <pointLight
        position={[position[0], position[1], position[2]]}
        color={color}
        intensity={1}
        distance={5}
      />
      {hovered && !collecting && (
        <Html
          position={[position[0], position[1] + 1, position[2]]}
          center
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.8)",
              color: "white",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
              border: `1px solid ${color}`,
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}

interface CollectiblesProps {
  playerPosition: [number, number, number];
  onCollect: (gem: { id: string; label: string; points: number }, position: [number, number, number], color: string) => void;
  collectedIds: string[];
}

export default function Collectibles({ playerPosition, onCollect, collectedIds }: CollectiblesProps) {
  const gems = useMemo(() => GEMS, []);

  return (
    <group>
      {gems.map((gem) => (
        <Gem
          key={gem.id}
          {...gem}
          playerPosition={playerPosition}
          onCollect={onCollect}
          collected={collectedIds.includes(gem.id)}
        />
      ))}
    </group>
  );
}

export { GEMS };

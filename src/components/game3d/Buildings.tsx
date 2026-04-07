"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface BuildingsProps {
  onSelectSection: (section: string) => void;
}

interface BuildingConfig {
  id: string;
  label: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roofColor: string;
  icon: string;
  description: string;
}

const BUILDINGS: BuildingConfig[] = [
  {
    id: "about",
    label: "About Me",
    position: [-10, 0, -3],
    size: [5, 4, 5],
    color: "#8B4513",
    roofColor: "#c84b31",
    icon: "👤",
    description: "Learn about Divyansh",
  },
  {
    id: "experience",
    label: "Experience",
    position: [-10, 0, -14],
    size: [5, 5, 5],
    color: "#4a6741",
    roofColor: "#2a6e4a",
    icon: "💼",
    description: "Career journey",
  },
  {
    id: "skills",
    label: "Skills",
    position: [0, 0, -14],
    size: [6, 3, 5],
    color: "#4a5568",
    roofColor: "#667eea",
    icon: "⚡",
    description: "Tech stack & tools",
  },
  {
    id: "projects",
    label: "Projects",
    position: [10, 0, -3],
    size: [5, 5, 5],
    color: "#744210",
    roofColor: "#d69e2e",
    icon: "🏗️",
    description: "Featured work",
  },
  {
    id: "blog",
    label: "Blog",
    position: [10, 0, -14],
    size: [5, 4, 5],
    color: "#553c9a",
    roofColor: "#805ad5",
    icon: "📚",
    description: "Engineering diaries",
  },
  {
    id: "contact",
    label: "Contact",
    position: [0, 0, -22],
    size: [6, 4, 5],
    color: "#2d3748",
    roofColor: "#c84b31",
    icon: "📬",
    description: "Get in touch",
  },
];

export default function Buildings({ onSelectSection }: BuildingsProps) {
  return (
    <group>
      {BUILDINGS.map((building) => (
        <Building key={building.id} config={building} onSelect={onSelectSection} />
      ))}
      {/* Spawn sign */}
      <group position={[0.5, 0, 10]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[3, 1.5, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <Html position={[0, 1.6, 0.2]} center transform distanceFactor={8}>
          <div className="pointer-events-none select-none text-center font-serif text-sm font-bold text-amber-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
            <div>Welcome to</div>
            <div>Divyansh&apos;s Portfolio</div>
            <div className="text-xs text-yellow-300">Explore the buildings!</div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function Building({ config, onSelect }: { config: BuildingConfig; onSelect: (s: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const { id, label, position, size, color, roofColor, icon, description } = config;
  const [w, h, d] = size;

  // Floating label animation
  const labelRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (labelRef.current) {
      labelRef.current.position.y = h + 2.5 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Building body */}
      <mesh
        position={[0, h / 2, 0]}
        castShadow
        receiveShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(id)}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={hovered ? "#f5f0e8" : color} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, h + 0.4, 0]} castShadow>
        <boxGeometry args={[w + 0.6, 0.8, d + 0.6]} />
        <meshStandardMaterial color={roofColor} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1, d / 2 + 0.01]}>
        <boxGeometry args={[1.2, 2, 0.1]} />
        <meshStandardMaterial color="#2d1b0e" />
      </mesh>

      {/* Windows */}
      <mesh position={[-1.2, h * 0.65, d / 2 + 0.01]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[1.2, h * 0.65, d / 2 + 0.01]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.3} />
      </mesh>

      {/* Floating label using Html (no troika dependency) */}
      <group ref={labelRef} position={[0, h + 2.5, 0]}>
        {/* Icon block */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.2, 0.3]} />
          <meshStandardMaterial color={roofColor} />
        </mesh>
        <Html position={[0, 0.6, 0.2]} center>
          <div className="pointer-events-none select-none text-2xl">{icon}</div>
        </Html>

        {/* Label sign */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[3.5, 0.8, 0.2]} />
          <meshStandardMaterial color="#3d2b1f" />
        </mesh>
        <Html position={[0, -0.3, 0.15]} center>
          <div className="pointer-events-none select-none whitespace-nowrap font-mono text-xs font-bold uppercase tracking-wider text-amber-100 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)]">
            {label}
          </div>
        </Html>
      </group>

      {/* Interaction prompt on hover */}
      {hovered && (
        <Html position={[0, h + 5, 0]} center>
          <div className="pointer-events-none whitespace-nowrap rounded-lg bg-black/80 px-4 py-2 text-center text-sm text-white backdrop-blur-sm">
            <div className="font-bold">{label}</div>
            <div className="text-xs text-gray-300">{description}</div>
            <div className="mt-1 text-xs text-yellow-400">Click to enter</div>
          </div>
        </Html>
      )}
    </group>
  );
}

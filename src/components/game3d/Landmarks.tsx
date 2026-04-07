"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface LandmarksProps {
  onSelectSection: (section: string) => void;
}

interface LandmarkConfig {
  id: string;
  label: string;
  position: [number, number, number];
  icon: string;
  description: string;
  color: string;
}

const LANDMARKS: LandmarkConfig[] = [
  { id: "about", label: "Campfire — About Me", position: [-25, 0, -10], icon: "🏕️", description: "Learn about Divyansh", color: "#c84b31" },
  { id: "experience", label: "Stone Monument — Experience", position: [-40, 0, -50], icon: "🗿", description: "Career journey", color: "#8B7355" },
  { id: "skills", label: "Waterfall — Skills", position: [5, 0, -55], icon: "🌊", description: "Tech stack & tools", color: "#4a90d9" },
  { id: "projects", label: "Treehouse — Projects", position: [40, 0, -15], icon: "🏠", description: "Featured work", color: "#d69e2e" },
  { id: "blog", label: "Library Cave — Blog", position: [35, 0, -60], icon: "📚", description: "Engineering diaries", color: "#805ad5" },
  { id: "contact", label: "Dock — Contact", position: [-5, 0, 35], icon: "⚓", description: "Get in touch", color: "#2a6e4a" },
];

export { LANDMARKS };

export default function Landmarks({ onSelectSection }: LandmarksProps) {
  return (
    <group>
      {LANDMARKS.map((lm) => (
        <Landmark key={lm.id} config={lm} onSelect={onSelectSection} />
      ))}
    </group>
  );
}

function Landmark({ config, onSelect }: { config: LandmarkConfig; onSelect: (s: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const signRef = useRef<THREE.Group>(null);

  const { id, label, position, icon, description, color } = config;

  useFrame(({ clock }) => {
    if (signRef.current) {
      signRef.current.position.y = 5 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Different structures per landmark */}
      {id === "about" && <Campfire />}
      {id === "experience" && <StoneMonument />}
      {id === "skills" && <Waterfall />}
      {id === "projects" && <Treehouse />}
      {id === "blog" && <LibraryCave />}
      {id === "contact" && <Dock />}

      {/* Clickable area */}
      <mesh
        position={[0, 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(id)}
        visible={false}
      >
        <sphereGeometry args={[5, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Floating sign */}
      <group ref={signRef} position={[0, 5, 0]}>
        <Html center>
          <div
            className={`pointer-events-none select-none rounded-lg px-3 py-2 text-center backdrop-blur-sm transition-all ${
              hovered ? "scale-110 bg-black/80" : "bg-black/50"
            }`}
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <div className="text-lg">{icon}</div>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
              {label.split("—")[0].trim()}
            </div>
            {hovered && (
              <div className="mt-1 font-mono text-[9px] text-yellow-400">
                Click to explore
              </div>
            )}
          </div>
        </Html>
      </group>

      {/* Ground glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[3, 4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.3 : 0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ====== Landmark structures ======

function Campfire() {
  return (
    <group>
      {/* Logs */}
      {[0, 1.2, 2.4, 3.6, 4.8].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.8, 0.15, Math.sin(angle) * 0.8]} rotation={[0, angle, Math.PI / 2]}>
          <boxGeometry args={[0.3, 1.5, 0.3]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
      ))}
      {/* Fire glow */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#ff6b35" emissive="#ff4500" emissiveIntensity={2} />
      </mesh>
      {/* Tent */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -0.5, 0]}>
        <coneGeometry args={[2, 3, 4]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* Sitting logs */}
      <mesh position={[-2, 0.3, 0]}>
        <boxGeometry args={[2, 0.6, 0.6]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      <mesh position={[0, 0.3, -2]}>
        <boxGeometry args={[0.6, 0.6, 2]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
    </group>
  );
}

function StoneMonument() {
  return (
    <group>
      {/* Stone pillars */}
      {[-2, -1, 0, 1, 2].map((x, i) => (
        <mesh key={i} position={[x * 1.5, (3 - Math.abs(x)) * 0.8, 0]} castShadow>
          <boxGeometry args={[1, (3 - Math.abs(x)) * 1.6, 1]} />
          <meshStandardMaterial color={`hsl(30, 15%, ${35 + i * 5}%)`} />
        </mesh>
      ))}
      {/* Top slab */}
      <mesh position={[0, 5, 0]} castShadow>
        <boxGeometry args={[8, 0.6, 1.5]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[9, 0.3, 3]} />
        <meshStandardMaterial color="#6B5B4F" />
      </mesh>
    </group>
  );
}

function Waterfall() {
  return (
    <group>
      {/* Rock wall */}
      <mesh position={[0, 3, -2]} castShadow>
        <boxGeometry args={[6, 6, 3]} />
        <meshStandardMaterial color="#6B6B6B" />
      </mesh>
      <mesh position={[0, 5, -1.5]} castShadow>
        <boxGeometry args={[4, 3, 2]} />
        <meshStandardMaterial color="#5a5a5a" />
      </mesh>
      {/* Water stream */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[1.5, 6, 0.3]} />
        <meshStandardMaterial color="#4a90d9" transparent opacity={0.7} emissive="#4a90d9" emissiveIntensity={0.2} />
      </mesh>
      {/* Pool */}
      <mesh position={[0, 0.05, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 16]} />
        <meshStandardMaterial color="#3a7bc8" transparent opacity={0.6} />
      </mesh>
      {/* Rocks around pool */}
      {[[-2, 0.4, 3], [2.5, 0.3, 1.5], [-1.5, 0.5, 4], [3, 0.35, 3]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[1 + Math.random() * 0.5, 0.8, 1 + Math.random() * 0.5]} />
          <meshStandardMaterial color={`hsl(0, 0%, ${40 + Math.random() * 20}%)`} />
        </mesh>
      ))}
    </group>
  );
}

function Treehouse() {
  return (
    <group>
      {/* Big tree trunk */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[1.5, 6, 1.5]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      {/* House platform */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[5, 0.3, 5]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* House walls */}
      <mesh position={[0, 7, 0]} castShadow>
        <boxGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#A0522D" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 9, 0]} castShadow>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#2a6e4a" />
      </mesh>
      {/* Window */}
      <mesh position={[0, 7, 2.01]}>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
        <meshStandardMaterial color="#87ceeb" emissive="#ffd700" emissiveIntensity={0.3} />
      </mesh>
      {/* Ladder */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[2, i + 0.5, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.8]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
      ))}
      {/* Ladder sides */}
      <mesh position={[2, 2.5, -0.35]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      <mesh position={[2, 2.5, 0.35]}>
        <boxGeometry args={[0.1, 5, 0.1]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      {/* Tree crown */}
      <mesh position={[0, 10, 0]} castShadow>
        <boxGeometry args={[6, 4, 6]} />
        <meshStandardMaterial color="#2d5a1e" />
      </mesh>
    </group>
  );
}

function LibraryCave() {
  return (
    <group>
      {/* Cave entrance */}
      <mesh position={[0, 2.5, -2]} castShadow>
        <boxGeometry args={[7, 5, 4]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[0, 4, -1.5]}>
        <boxGeometry args={[5, 2, 3]} />
        <meshStandardMaterial color="#3a3a3a" />
      </mesh>
      {/* Entrance hole */}
      <mesh position={[0, 1.5, 0.01]}>
        <boxGeometry args={[3, 3, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Bookshelves inside (visible through entrance) */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x * 1.5, 1.5, -1.5]}>
          <boxGeometry args={[1, 3, 0.4]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}
      {/* Lantern */}
      <mesh position={[2.5, 2.5, 0.5]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function Dock() {
  return (
    <group>
      {/* Dock planks */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[3, 0.2, 8]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      {/* Dock posts */}
      {[-1, 1].map((x) =>
        [0, 2, 4].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.3, z - 2]}>
            <boxGeometry args={[0.3, 1.2, 0.3]} />
            <meshStandardMaterial color="#5C3317" />
          </mesh>
        ))
      )}
      {/* Rope posts */}
      <mesh position={[-1.3, 0.8, 2]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      <mesh position={[1.3, 0.8, 2]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color="#5C3317" />
      </mesh>
      {/* Small boat */}
      <mesh position={[3, 0.1, 1]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.4, 3]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
    </group>
  );
}

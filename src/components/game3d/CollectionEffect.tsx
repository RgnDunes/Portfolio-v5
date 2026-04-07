"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface CollectionEffectProps {
  position: [number, number, number];
  color: string;
  label: string;
  onComplete: () => void;
}

interface Particle {
  velocity: THREE.Vector3;
  offset: THREE.Vector3;
}

export default function CollectionEffect({
  position,
  color,
  label,
  onComplete,
}: CollectionEffectProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);
  const [alive, setAlive] = useState(true);

  const particles = useRef<Particle[]>(
    Array.from({ length: 5 }, () => ({
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        Math.random() * 4 + 2,
        (Math.random() - 0.5) * 6
      ),
      offset: new THREE.Vector3(0, 0, 0),
    }))
  );

  useEffect(() => {
    return () => {
      // cleanup
    };
  }, []);

  useFrame((_, delta) => {
    if (!alive) return;

    progress.current += delta;

    // Ring expansion and fade
    if (ringRef.current) {
      const t = progress.current;
      const s = t * 3;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 1 - t);
    }

    // Text rising
    if (textRef.current) {
      const rise = progress.current * 2;
      textRef.current.style.transform = `translateY(${-rise * 30}px)`;
      textRef.current.style.opacity = `${Math.max(0, 1 - progress.current)}`;
    }

    // Particles
    particles.current.forEach((p, i) => {
      p.offset.add(p.velocity.clone().multiplyScalar(delta));
      p.velocity.y -= 8 * delta; // gravity
      const mesh = particleRefs.current[i];
      if (mesh) {
        mesh.position.set(
          position[0] + p.offset.x,
          position[1] + p.offset.y,
          position[2] + p.offset.z
        );
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 1 - progress.current);
        const s = Math.max(0, 0.15 * (1 - progress.current));
        mesh.scale.setScalar(s);
      }
    });

    if (progress.current >= 1) {
      setAlive(false);
      onComplete();
    }
  });

  if (!alive) return null;

  return (
    <group>
      {/* Expanding ring */}
      <mesh
        ref={ringRef}
        position={[position[0], position[1], position[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating +10 text */}
      <Html
        position={[position[0], position[1] + 1.5, position[2]]}
        center
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={textRef}
          style={{
            color: color,
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "18px",
            textShadow: "0 0 8px rgba(0,0,0,0.8)",
            whiteSpace: "nowrap",
          }}
        >
          +10 {label}
        </div>
      </Html>

      {/* Burst particles */}
      {particles.current.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
          position={[position[0], position[1], position[2]]}
        >
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={1} />
        </mesh>
      ))}
    </group>
  );
}

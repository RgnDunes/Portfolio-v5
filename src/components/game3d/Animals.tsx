"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Animals() {
  return (
    <group>
      <Deer position={[-20, 0, 15]} rotation={0.5} />
      <Deer position={[30, 0, -30]} rotation={1.5} />
      <Deer position={[-50, 0, -40]} rotation={0.8} />
      <Deer position={[55, 0, 10]} rotation={2.2} />

      <Rabbit position={[15, 0, -5]} />
      <Rabbit position={[-35, 0, 20]} />
      <Rabbit position={[50, 0, -45]} />
      <Rabbit position={[-15, 0, -60]} />
      <Rabbit position={[-55, 0, 30]} />

      <Bird startPosition={[0, 20, 0]} radius={30} speed={0.3} />
      <Bird startPosition={[20, 24, -20]} radius={25} speed={0.4} />
      <Bird startPosition={[-30, 18, 10]} radius={35} speed={0.25} />
      <Bird startPosition={[10, 22, -40]} radius={28} speed={0.35} />
      <Bird startPosition={[-40, 26, -30]} radius={20} speed={0.32} />

      <Fish position={[8, -0.2, 18]} />
      <Fish position={[12, -0.2, 22]} />
      <Fish position={[6, -0.2, 24]} />
      <Fish position={[14, -0.2, 16]} />
    </group>
  );
}

function Deer({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const headRef = useRef<THREE.Group>(null);
  const leg1 = useRef<THREE.Mesh>(null);
  const leg2 = useRef<THREE.Mesh>(null);
  const leg3 = useRef<THREE.Mesh>(null);
  const leg4 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.15;
    }
    // Idle leg sway
    const t = clock.getElapsedTime() * 0.8 + position[0];
    const sway = Math.sin(t) * 0.1;
    if (leg1.current) leg1.current.rotation.x = sway;
    if (leg2.current) leg2.current.rotation.x = -sway;
    if (leg3.current) leg3.current.rotation.x = -sway;
    if (leg4.current) leg4.current.rotation.x = sway;
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={1.8}>
      {/* Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[1.2, 1, 2.5]} />
        <meshStandardMaterial color="#b8860b" />
      </mesh>
      {/* Belly (lighter) */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[1, 0.3, 2]} />
        <meshStandardMaterial color="#d4a760" />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 2.1, 1]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshStandardMaterial color="#c49630" />
      </mesh>
      {/* Head */}
      <group ref={headRef} position={[0, 2.6, 1.4]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.6, 0.9]} />
          <meshStandardMaterial color="#c49630" />
        </mesh>
        {/* Snout */}
        <mesh position={[0, -0.1, 0.45]}>
          <boxGeometry args={[0.4, 0.35, 0.3]} />
          <meshStandardMaterial color="#d4a760" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.25, 0.1, 0.4]}>
          <boxGeometry args={[0.12, 0.12, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.25, 0.1, 0.4]}>
          <boxGeometry args={[0.12, 0.12, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Antlers */}
        <mesh position={[-0.2, 0.6, 0]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[0.2, 0.6, 0]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[-0.35, 0.9, 0]}>
          <boxGeometry args={[0.25, 0.1, 0.1]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[0.35, 0.9, 0]}>
          <boxGeometry args={[0.25, 0.1, 0.1]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.3, 0.35, -0.1]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.15, 0.3, 0.08]} />
          <meshStandardMaterial color="#b8860b" />
        </mesh>
        <mesh position={[0.3, 0.35, -0.1]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.15, 0.3, 0.08]} />
          <meshStandardMaterial color="#b8860b" />
        </mesh>
      </group>
      {/* Legs */}
      <mesh ref={leg1} position={[-0.35, 0.5, -0.8]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh ref={leg2} position={[0.35, 0.5, -0.8]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh ref={leg3} position={[-0.35, 0.5, 0.8]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh ref={leg4} position={[0.35, 0.5, 0.8]} castShadow>
        <boxGeometry args={[0.25, 1, 0.25]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 1.7, -1.3]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
    </group>
  );
}

function Rabbit({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(clock.getElapsedTime() * 2.5 + position[0])) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={1.5}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 1]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.85, 0.4]} castShadow>
        <boxGeometry args={[0.55, 0.5, 0.5]} />
        <meshStandardMaterial color="#e0d5c0" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 0.9, 0.66]}>
        <boxGeometry args={[0.1, 0.08, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 0.9, 0.66]}>
        <boxGeometry args={[0.1, 0.08, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Nose */}
      <mesh position={[0, 0.8, 0.67]}>
        <boxGeometry args={[0.08, 0.06, 0.04]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.1, 1.35, 0.3]}>
        <boxGeometry args={[0.12, 0.5, 0.08]} />
        <meshStandardMaterial color="#dbb8a0" />
      </mesh>
      <mesh position={[0.1, 1.35, 0.3]}>
        <boxGeometry args={[0.12, 0.5, 0.08]} />
        <meshStandardMaterial color="#dbb8a0" />
      </mesh>
      {/* Inner ears (pink) */}
      <mesh position={[-0.1, 1.35, 0.34]}>
        <boxGeometry args={[0.06, 0.35, 0.02]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      <mesh position={[0.1, 1.35, 0.34]}>
        <boxGeometry args={[0.06, 0.35, 0.02]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      {/* Front paws */}
      <mesh position={[-0.2, 0.15, 0.3]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      <mesh position={[0.2, 0.15, 0.3]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      {/* Back legs (bigger) */}
      <mesh position={[-0.2, 0.2, -0.3]}>
        <boxGeometry args={[0.25, 0.4, 0.3]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      <mesh position={[0.2, 0.2, -0.3]}>
        <boxGeometry args={[0.25, 0.4, 0.3]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      {/* Fluffy tail */}
      <mesh position={[0, 0.55, -0.55]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
    </group>
  );
}

function Bird({ startPosition, radius, speed }: { startPosition: [number, number, number]; radius: number; speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const wingLRef = useRef<THREE.Mesh>(null);
  const wingRRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed;
    groupRef.current.position.x = startPosition[0] + Math.cos(t) * radius;
    groupRef.current.position.z = startPosition[2] + Math.sin(t) * radius;
    groupRef.current.position.y = startPosition[1] + Math.sin(t * 2) * 3;
    groupRef.current.rotation.y = -t + Math.PI / 2;

    const wingAngle = Math.sin(clock.getElapsedTime() * 6) * 0.6;
    if (wingLRef.current) wingLRef.current.rotation.z = wingAngle;
    if (wingRRef.current) wingRRef.current.rotation.z = -wingAngle;
  });

  return (
    <group ref={groupRef} position={startPosition} scale={2}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.3, 0.25, 0.8]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.1, 0.4]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      {/* Beak */}
      <mesh position={[0, 0.05, 0.6]}>
        <boxGeometry args={[0.1, 0.08, 0.2]} />
        <meshStandardMaterial color="#d69e2e" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.05, -0.5]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      {/* Wings */}
      <mesh ref={wingLRef} position={[-0.35, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.5]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      <mesh ref={wingRRef} position={[0.35, 0, 0]}>
        <boxGeometry args={[0.6, 0.05, 0.5]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    </group>
  );
}

function Fish({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() + position[0];
      meshRef.current.position.x = position[0] + Math.sin(t * 0.8) * 4;
      meshRef.current.position.z = position[2] + Math.cos(t * 0.8) * 4;
      meshRef.current.rotation.y = -t * 0.8 + Math.PI / 2;
      // Occasional jump
      const jumpPhase = Math.sin(t * 0.3);
      meshRef.current.position.y = jumpPhase > 0.9 ? position[1] + (jumpPhase - 0.9) * 10 : position[1];
    }
  });

  return (
    <group ref={meshRef} position={position} scale={1.2}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.2, 0.3, 0.6]} />
        <meshStandardMaterial color="#ff8c42" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0, -0.4]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.25, 0.25, 0.1]} />
        <meshStandardMaterial color="#ff6b20" />
      </mesh>
    </group>
  );
}

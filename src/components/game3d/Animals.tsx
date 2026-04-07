"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Animals() {
  return (
    <group>
      {/* Deer */}
      <Deer position={[-20, 0, 15]} />
      <Deer position={[30, 0, -30]} rotation={1.5} />
      <Deer position={[-50, 0, -40]} rotation={0.8} />

      {/* Rabbits */}
      <Rabbit position={[15, 0, -5]} />
      <Rabbit position={[-35, 0, 20]} />
      <Rabbit position={[50, 0, -45]} />
      <Rabbit position={[-15, 0, -60]} />

      {/* Birds (flying) */}
      <Bird startPosition={[0, 15, 0]} radius={25} speed={0.3} />
      <Bird startPosition={[20, 18, -20]} radius={20} speed={0.4} />
      <Bird startPosition={[-30, 12, 10]} radius={30} speed={0.25} />
      <Bird startPosition={[10, 20, -40]} radius={22} speed={0.35} />

      {/* Fish in lake */}
      <Fish position={[8, -0.3, 18]} />
      <Fish position={[12, -0.3, 22]} />
      <Fish position={[6, -0.3, 24]} />
    </group>
  );
}

function Deer({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Body */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 1.8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* Head */}
      <group ref={headRef} position={[0, 1.8, 1]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.5, 0.6]} />
          <meshStandardMaterial color="#A0782C" />
        </mesh>
        {/* Antlers */}
        <mesh position={[-0.15, 0.5, 0]}>
          <boxGeometry args={[0.08, 0.6, 0.08]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[0.15, 0.5, 0]}>
          <boxGeometry args={[0.08, 0.6, 0.08]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[-0.25, 0.7, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        <mesh position={[0.25, 0.7, 0]}>
          <boxGeometry args={[0.15, 0.08, 0.08]} />
          <meshStandardMaterial color="#5C3317" />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.15, 0.05, 0.31]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.15, 0.05, 0.31]}>
          <boxGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
      {/* Legs */}
      {[[-0.25, -0.6], [0.25, -0.6], [-0.25, 0.6], [0.25, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.4, z]} castShadow>
          <boxGeometry args={[0.15, 0.8, 0.15]} />
          <meshStandardMaterial color="#6B4E1A" />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[0, 1.3, -1]}>
        <boxGeometry args={[0.15, 0.2, 0.15]} />
        <meshStandardMaterial color="#f5f0e8" />
      </mesh>
    </group>
  );
}

function Rabbit({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Subtle idle hop
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(clock.getElapsedTime() * 2 + position[0])) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.6]} />
        <meshStandardMaterial color="#d4c5a9" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.55, 0.25]} castShadow>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#e0d5c0" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.06, 0.85, 0.25]}>
        <boxGeometry args={[0.08, 0.35, 0.06]} />
        <meshStandardMaterial color="#dbb8a0" />
      </mesh>
      <mesh position={[0.06, 0.85, 0.25]}>
        <boxGeometry args={[0.08, 0.35, 0.06]} />
        <meshStandardMaterial color="#dbb8a0" />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.35, -0.35]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
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
    groupRef.current.position.y = startPosition[1] + Math.sin(t * 2) * 2;
    groupRef.current.rotation.y = -t + Math.PI / 2;

    // Wing flap
    const wingAngle = Math.sin(clock.getElapsedTime() * 8) * 0.5;
    if (wingLRef.current) wingLRef.current.rotation.z = wingAngle;
    if (wingRRef.current) wingRRef.current.rotation.z = -wingAngle;
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.2, 0.15, 0.5]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      {/* Wings */}
      <mesh ref={wingLRef} position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.03, 0.3]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      <mesh ref={wingRRef} position={[0.3, 0, 0]}>
        <boxGeometry args={[0.5, 0.03, 0.3]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
    </group>
  );
}

function Fish({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() + position[0];
      meshRef.current.position.x = position[0] + Math.sin(t * 0.8) * 3;
      meshRef.current.position.z = position[2] + Math.cos(t * 0.8) * 3;
      meshRef.current.rotation.y = -t * 0.8 + Math.PI / 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 0.08, 0.3]} />
      <meshStandardMaterial color="#ff8c42" />
    </mesh>
  );
}

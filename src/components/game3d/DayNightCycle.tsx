"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import * as THREE from "three";

// Full day/night cycle in ~180 seconds (3 minutes), starts at morning
const CYCLE_DURATION = 180;

export default function DayNightCycle() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const sunPosRef = useRef<[number, number, number]>([100, 60, 100]);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, scene }) => {
    const t = (clock.getElapsedTime() % CYCLE_DURATION) / CYCLE_DURATION;
    const angle = t * Math.PI * 2;

    // Sun position: arcs from east to west
    const sunY = Math.sin(angle) * 100;
    const sunX = Math.cos(angle) * 100;
    sunPosRef.current = [sunX, sunY, 50];

    // Moon (opposite side)
    if (moonRef.current) {
      moonRef.current.position.set(-sunX * 0.8, -sunY * 0.8, 40);
      moonRef.current.visible = sunY < 10;
    }

    // Adjust lighting based on sun height
    const dayFactor = Math.max(0, Math.min(1, sunY / 40)); // 0 = night, 1 = day

    if (sunRef.current) {
      sunRef.current.position.set(sunX, Math.max(sunY, 5), 50);
      sunRef.current.intensity = 0.3 + dayFactor * 1.2;

      // Sunset/sunrise color
      if (dayFactor < 0.4) {
        sunRef.current.color.setHex(0xff8844); // orange
      } else {
        sunRef.current.color.setHex(0xffffff); // white
      }
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.5 + dayFactor * 0.3;
      if (dayFactor < 0.3) {
        ambientRef.current.color.setHex(0x8899bb); // bright moonlit blue
      } else {
        ambientRef.current.color.setHex(0xffffff);
      }
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = 0.35 + dayFactor * 0.25;
    }

    // Fog color changes with time of day
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      if (dayFactor < 0.2) {
        scene.fog.color.setHex(0x1a1a3e); // night
      } else if (dayFactor < 0.4) {
        scene.fog.color.setHex(0xd4886a); // sunset/sunrise
      } else {
        scene.fog.color.setHex(0xc9daea); // day
      }
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight
        ref={sunRef}
        position={[100, 60, 50]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      <hemisphereLight ref={hemiRef} args={["#87ceeb", "#556b2f", 0.4]} />

      <Sky
        sunPosition={sunPosRef.current}
        turbidity={6}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Moon */}
      <mesh ref={moonRef} position={[-80, 60, 40]} visible={false}>
        <sphereGeometry args={[3, 8, 8]} />
        <meshBasicMaterial color="#e8e8d0" />
      </mesh>

      {/* Stars (visible at night - always rendered, visibility handled by sky) */}
      <Stars />
    </>
  );
}

function Stars() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = (clock.getElapsedTime() % CYCLE_DURATION) / CYCLE_DURATION;
      const sunY = Math.sin(t * Math.PI * 2) * 100;
      // Show stars at night
      groupRef.current.visible = sunY < 15;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 100 }).map((_, i) => {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.4 + 0.1;
        const r = 150;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.cos(phi) + 20;
        const z = r * Math.sin(phi) * Math.sin(theta);
        return (
          <mesh key={i} position={[x, y, z]}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        );
      })}
    </group>
  );
}

"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Slow cycle — 5 minutes for full day/night, starts at midday
const CYCLE_DURATION = 300;

export default function DayNightCycle() {
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);

  useFrame(({ clock }) => {
    // Start at midday (offset by quarter cycle)
    const t = ((clock.getElapsedTime() + CYCLE_DURATION * 0.25) % CYCLE_DURATION) / CYCLE_DURATION;
    const angle = t * Math.PI * 2;
    const sunY = Math.sin(angle) * 100;
    const sunX = Math.cos(angle) * 100;
    const dayFactor = Math.max(0, Math.min(1, sunY / 40));

    if (sunRef.current) {
      sunRef.current.position.set(sunX, Math.max(sunY, 10), 50);
      sunRef.current.intensity = 0.5 + dayFactor * 1.0;
      if (dayFactor < 0.3) {
        sunRef.current.color.setHex(0xff8844);
      } else {
        sunRef.current.color.setHex(0xffffff);
      }
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.5 + dayFactor * 0.3;
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = 0.35 + dayFactor * 0.25;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.6} />
      <directionalLight
        ref={sunRef}
        position={[80, 80, 50]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={150}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <hemisphereLight ref={hemiRef} args={["#87ceeb", "#556b2f", 0.4]} />

      {/* Static sky color — no drei Sky component (it was causing white sky issues) */}
      <color attach="background" args={["#87ceeb"]} />
    </>
  );
}

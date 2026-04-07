"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 12;

interface CharacterProps {
  onPositionChange?: (pos: [number, number, number]) => void;
}

export default function Character({ onPositionChange }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();

  const [, getKeys] = useKeyboardControls();

  // Orbit camera state
  const orbit = useRef({ angle: 0, pitch: 0.5, distance: 14, dragging: false, lastX: 0, lastY: 0 });

  // Mouse controls for orbiting camera
  useEffect(() => {
    const canvas = gl.domElement;

    const onMouseDown = (e: MouseEvent) => {
      orbit.current.dragging = true;
      orbit.current.lastX = e.clientX;
      orbit.current.lastY = e.clientY;
    };
    const onMouseUp = () => { orbit.current.dragging = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!orbit.current.dragging) return;
      const dx = e.clientX - orbit.current.lastX;
      const dy = e.clientY - orbit.current.lastY;
      orbit.current.angle -= dx * 0.005;
      orbit.current.pitch = Math.max(0.25, Math.min(0.85, orbit.current.pitch + dy * 0.004));
      orbit.current.lastX = e.clientX;
      orbit.current.lastY = e.clientY;
    };
    const onWheel = (e: WheelEvent) => {
      orbit.current.distance = Math.max(10, Math.min(22, orbit.current.distance + e.deltaY * 0.015));
    };
    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        orbit.current.dragging = true;
        orbit.current.lastX = e.touches[0].clientX;
        orbit.current.lastY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => { orbit.current.dragging = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!orbit.current.dragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - orbit.current.lastX;
      const dy = e.touches[0].clientY - orbit.current.lastY;
      orbit.current.angle -= dx * 0.005;
      orbit.current.pitch = Math.max(0.25, Math.min(0.85, orbit.current.pitch + dy * 0.004));
      orbit.current.lastX = e.touches[0].clientX;
      orbit.current.lastY = e.touches[0].clientY;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [gl]);

  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const currentCameraPos = useMemo(() => new THREE.Vector3(0, 10, 16), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const { forward, backward, left, right } = getKeys();
    const moving = forward || backward || left || right;

    // Camera-relative movement
    const angle = orbit.current.angle;
    const camForward = new THREE.Vector3(-Math.sin(angle), 0, -Math.cos(angle));
    const camRight = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));

    const moveDir = new THREE.Vector3();
    if (forward) moveDir.add(camForward);
    if (backward) moveDir.sub(camForward);
    if (left) moveDir.sub(camRight);
    if (right) moveDir.add(camRight);

    if (moveDir.length() > 0) {
      moveDir.normalize();
      groupRef.current.position.x += moveDir.x * SPEED * delta;
      groupRef.current.position.z += moveDir.z * SPEED * delta;

      // Rotate character to face movement direction
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);
      let angleDiff = targetAngle - groupRef.current.rotation.y;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      groupRef.current.rotation.y += angleDiff * 15 * delta;
    }

    // World bounds
    groupRef.current.position.x = Math.max(-90, Math.min(90, groupRef.current.position.x));
    groupRef.current.position.z = Math.max(-90, Math.min(90, groupRef.current.position.z));

    // Terrain height (simple: keep on ground)
    groupRef.current.position.y = 0.5;

    // Walking animation
    const time = Date.now() * 0.008;
    const swing = moving ? Math.sin(time) * 0.8 : 0;
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = swing;

    // Orbit camera
    const { distance, pitch } = orbit.current;
    const charPos = groupRef.current.position;
    const desiredCameraPos = new THREE.Vector3(
      charPos.x + Math.sin(angle) * distance * Math.cos(pitch),
      charPos.y + distance * Math.sin(pitch),
      charPos.z + Math.cos(angle) * distance * Math.cos(pitch)
    );

    currentCameraPos.lerp(desiredCameraPos, 8 * delta);
    camera.position.copy(currentCameraPos);
    cameraTarget.set(charPos.x, charPos.y + 2, charPos.z);
    camera.lookAt(cameraTarget);

    if (onPositionChange) {
      onPositionChange([charPos.x, charPos.y, charPos.z]);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.15, 2.65, 0.41]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#2d1b0e" />
      </mesh>
      <mesh position={[0.15, 2.65, 0.41]}>
        <boxGeometry args={[0.15, 0.1, 0.02]} />
        <meshStandardMaterial color="#2d1b0e" />
      </mesh>
      {/* Hair */}
      <mesh position={[0, 3.05, 0]} castShadow>
        <boxGeometry args={[0.85, 0.12, 0.85]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.5]} />
        <meshStandardMaterial color="#c84b31" />
      </mesh>
      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.65, 1.7, 0]} castShadow>
        <boxGeometry args={[0.35, 1.2, 0.35]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.65, 1.7, 0]} castShadow>
        <boxGeometry args={[0.35, 1.2, 0.35]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.35, 1.2, 0.35]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh ref={rightLegRef} position={[0.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.35, 1.2, 0.35]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      {/* Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

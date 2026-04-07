"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 10;
const ROTATION_SPEED = 3;

interface CharacterProps {
  onPositionChange?: (pos: [number, number, number]) => void;
}

export default function Character({ onPositionChange }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const isMoving = useRef(false);
  const { camera } = useThree();

  const [, getKeys] = useKeyboardControls();

  // Camera offset for third-person view
  const cameraOffset = useMemo(() => new THREE.Vector3(0, 8, 14), []);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const currentCameraPos = useMemo(() => new THREE.Vector3(0, 8, 14), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const { forward, backward, left, right } = getKeys();
    const moving = forward || backward || left || right;
    isMoving.current = moving;

    // Get camera's forward direction (projected onto XZ plane)
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0;
    cameraDirection.normalize();

    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0)).normalize();

    // Calculate movement direction
    const moveDirection = new THREE.Vector3();
    if (forward) moveDirection.add(cameraDirection);
    if (backward) moveDirection.sub(cameraDirection);
    if (left) moveDirection.sub(cameraRight);
    if (right) moveDirection.add(cameraRight);

    if (moveDirection.length() > 0) {
      moveDirection.normalize();

      // Move character
      groupRef.current.position.x += moveDirection.x * SPEED * delta;
      groupRef.current.position.z += moveDirection.z * SPEED * delta;

      // Rotate character to face movement direction
      const targetAngle = Math.atan2(moveDirection.x, moveDirection.z);
      const currentRotation = groupRef.current.rotation.y;
      let angleDiff = targetAngle - currentRotation;

      // Normalize angle difference
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      groupRef.current.rotation.y += angleDiff * ROTATION_SPEED * delta * 5;
    }

    // World bounds
    groupRef.current.position.x = Math.max(-35, Math.min(35, groupRef.current.position.x));
    groupRef.current.position.z = Math.max(-35, Math.min(35, groupRef.current.position.z));

    // Walking animation
    const time = Date.now() * 0.008;
    const swing = moving ? Math.sin(time) * 0.8 : 0;
    if (leftArmRef.current) leftArmRef.current.rotation.x = swing;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -swing;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = swing;

    // Third-person camera follow
    const charPos = groupRef.current.position;
    const desiredCameraPos = new THREE.Vector3(
      charPos.x + cameraOffset.x,
      charPos.y + cameraOffset.y,
      charPos.z + cameraOffset.z
    );

    currentCameraPos.lerp(desiredCameraPos, 3 * delta);
    camera.position.copy(currentCameraPos);

    cameraTarget.set(charPos.x, charPos.y + 2, charPos.z);
    camera.lookAt(cameraTarget);

    // Report position for minimap
    if (onPositionChange) {
      onPositionChange([charPos.x, charPos.y, charPos.z]);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 12]}>
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

      {/* Body / Torso */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.5]} />
        <meshStandardMaterial color="#c84b31" />
      </mesh>

      {/* Left Arm */}
      <mesh ref={leftArmRef} position={[-0.65, 1.7, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Right Arm */}
      <mesh ref={rightArmRef} position={[0.65, 1.7, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Shadow circle under character */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

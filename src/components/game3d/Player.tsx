"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 8;
const GRAVITY = -20;
const JUMP_FORCE = 8;

export default function Player() {
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const isGrounded = useRef(true);
  const { camera } = useThree();

  const [, getKeys] = useKeyboardControls();

  useFrame((_, delta) => {
    const { forward, backward, left, right, jump } = getKeys();

    // Calculate movement direction relative to camera
    const frontVector = new THREE.Vector3(0, 0, Number(backward) - Number(forward));
    const sideVector = new THREE.Vector3(Number(left) - Number(right), 0, 0);

    direction.current
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    // Apply horizontal movement
    camera.position.x += direction.current.x * delta;
    camera.position.z += direction.current.z * delta;

    // Apply gravity and jumping
    if (jump && isGrounded.current) {
      velocity.current.y = JUMP_FORCE;
      isGrounded.current = false;
    }

    velocity.current.y += GRAVITY * delta;
    camera.position.y += velocity.current.y * delta;

    // Ground collision
    if (camera.position.y <= 3) {
      camera.position.y = 3;
      velocity.current.y = 0;
      isGrounded.current = true;
    }

    // World bounds
    camera.position.x = Math.max(-38, Math.min(38, camera.position.x));
    camera.position.z = Math.max(-38, Math.min(38, camera.position.z));
  });

  return null;
}

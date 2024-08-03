import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CameraController() {
  const vec = new THREE.Vector3();

  useFrame(({ camera }) => {
    const scrollY = window.scrollY ;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const t = scrollY / maxScroll;

    // Smoothly interpolate camera position
    camera.fov = 80,
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.z = -150
    camera.position.lerp(vec.set(0, 0, -t ), 0.5); // Smooth interpolation
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

  });

  return null;
}

export default CameraController;

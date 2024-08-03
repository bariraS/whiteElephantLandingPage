import * as THREE from 'three';
import React, { forwardRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

const Logo3D = forwardRef((props, ref) => {
  const { scene } = useGLTF('/ImageToStl.com_elephant.gltf');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(1, 1, 1),
          emissive: new THREE.Color(1, 1, 1),
          emissiveIntensity: 1, // Adjust intensity for bloom effect
          wireframe:true,
          toneMapped: false,
        });
        child.layers.enable(1);  // Enable layer 1
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} scale={0.29} {...props} />;
});

export default Logo3D;

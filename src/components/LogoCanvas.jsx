// Logo3D.js
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Color, MeshBasicMaterial, MeshStandardMaterial, MeshToonMaterial } from 'three';
import { abs } from 'three/examples/jsm/nodes/Nodes.js';

const ELogo = () => {
  const { scene } = useGLTF('/elephent-logo.gltf');
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.05; // Adjust the speed of rotation
  });

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshBasicMaterial({ color: new Color('#fff') }); // Set the material to pure white
    }
  });

  return <primitive object={scene} ref={ref} scale={0.3} position={[0, 0, 0]} />;
};

const LogoCanvas = () => {
  return (
    <div style={{zIndex:20  , position:"relative"}}>
    <Canvas camera={{ position: [0, 0, 30] }} style={{ height: 80, width: 80, backgroundColor: 'transparent',  zIndex:200 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <ELogo  />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    </div>
  );
};

export default LogoCanvas;

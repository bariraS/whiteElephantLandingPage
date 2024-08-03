import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Lines = ({
    position,
    args=[0.5, 0.5, 294,32,32,32],
    // color=[39,1,71],
    color="#ffffff",
    scale=[1,1,1]
}) => {


  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={args} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default Lines;

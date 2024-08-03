import React, { useRef, useState } from 'react';
import { useLoader, extend } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Text, shaderMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

// Create a custom shader material for the gradient frame
const GradientMaterial = shaderMaterial(
  { color1: new THREE.Color(0x540C78), color2: new THREE.Color(0xff0000) }, // Define the colors for the gradient
  // Vertex shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment shader
  `
  uniform vec3 color1;
  uniform vec3 color2;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
  }
  `
);

extend({ GradientMaterial });

const Picture3D = ({ 
  url, 
  position = [0, 0, 0], 
  rotation, 
  frameWidth = 4.2, 
  frameDepth = 0.1, 
  text = 'Hello', 
  textSize = 0.5, 
  textColor = [255,255,255], 
  textOffsetY = 0 // Y offset for text above the picture
}) => {
  const texture = useLoader(TextureLoader, url);
  texture.minFilter = THREE.LinearMipMapLinearFilter;
  const frameRef = useRef(null);

  // State for hover effect
  const [hovered, setHovered] = useState(false);

  // Animation for text
  const { scale, blur } = useSpring({
    scale: hovered ? 1.2 : 1,
    blur: hovered ? 4 : 1,
    config: { mass: 1, tension: 300, friction: 20 }
  });

  return (
    <group position={position} rotation={rotation} scale={2}>
      {/* Photo */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 4, 0.3, 32, 32, 32]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Frame */}
      <mesh position={[0, 0, -0.15]} castShadow receiveShadow scale={[1.03, 1.03, 1.03]}>
        <boxGeometry args={[frameWidth, frameWidth, frameDepth, 32, 32, 32]} />
        <gradientMaterial toneMapped={false} color1="#16FBCD" color2="#230B5A" />
      </mesh>

      {/* 2D Text */}
      <animated.group
        scale={scale.to(s => [s, s, s])}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text
          position={[0, textOffsetY, 0.6]}
          fontSize={textSize}
          outlineBlur={blur}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          castShadow
          fontWeight={"bold"}
          letterSpacing={0.1}
          outlineColor={"#000000"}
          outlineWidth={0.04}
          outlineOpacity={0.4}
          receiveShadow
        >
          {text}
        </Text>
        <Text
          position={[-0.06, 0.05, 0.5]}
          fontSize={textSize}
          outlineBlur={blur}
          outlineOpacity={0.4}
          color={"#000000"}
          anchorX="center"
          anchorY="middle"
          castShadow
          fontWeight={"bold"}
          letterSpacing={0.1}
          outlineColor={"#000000"}
          outlineWidth={0.04}
          receiveShadow
        >
          {text}
        </Text>
      </animated.group>
    </group>
  );
};

export default Picture3D;

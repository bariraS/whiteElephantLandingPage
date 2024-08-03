import React from "react";
import { Canvas } from "@react-three/fiber";
import HexTunnel from "./components/HexTunnel";
import CameraController from "./components/CameraController";
import { OrbitControls } from "@react-three/drei";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
  Vignette,
  SSAO,
} from "@react-three/postprocessing";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div style={{ height: "1000vh" }}>
      <NavbarComponent/>
      <Canvas
        shadows
        
        style={{ position: "fixed", top: '30px', left: 0 }}
        onCreated={({ camera }) => camera.layers.enable(1)}
      >
        <ambientLight intensity={3} />
        <EffectComposer multisampling={4}>
        <Bloom intensity={0.01} luminanceThreshold={0.01} levels={1} />
          <ToneMapping />
          <Vignette offset={0.3} darkness={0.7} />
         
        </EffectComposer>
        <CameraController />

        <HexTunnel />
        <mesh
          receiveShadow
          position={[0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          
        >
          <planeGeometry args={[500, 500]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

export default App;

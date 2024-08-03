import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGLTF } from '@react-three/drei';
import Picture3D from './Picture3D';
import * as THREE from 'three';
import Logo3D from './Logo3D';
import { ScrollTrigger } from 'gsap/all';
import Lines from './Lines';
import Arrow from './Arrow';

import { Bloom, EffectComposer } from '@react-three/postprocessing';


// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function HexTunnel() {
  const groupRef = useRef(null);
  const whiteElephantRef = useRef(null);

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/image.jpg", (texture) => {
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 22);
    texture.mipmaps = true
  });

  useEffect(() => {
    // Create tunnel geometry
    const radius = 7;
    const height = 500;
    const segments = 6;
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      segments,
      1,
      true
    );
    geometry.rotateX(Math.PI/-2);
    geometry.rotateZ(Math.PI /2)

    // Create tunnel mesh
    const tunnel = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: texture,
        side: THREE.DoubleSide,
      })
    );
    tunnel.scale.set(3, 3, 1.5);

    groupRef.current.add(tunnel);
   
    // Create GSAP timeline for scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const scrollY = window.scrollY;
          const groupPosZ = -scrollY * 0.03;

          gsap.to(groupRef.current.position, {
            z: groupPosZ,
          });
        },
      },
    });

    // Continuous rotation animation for the logo
    gsap.to(whiteElephantRef.current.rotation, {
      y: 2 * Math.PI,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "none",
    });
    // Cleanup GSAP animations
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [texture]);



  return (
    <group ref={groupRef}>
 
      <group>
      <Arrow position={[-8,-18,-40]}/>
      <Arrow position={[-8,-18,-35]}/>
      <Arrow position={[-8,-18,-30]}/>
      <Arrow position={[-8,-18,-25]}/>
      <Arrow position={[-8,-18,-5]}/>
      <Arrow position={[-8,-18, 0]}/>
      <Arrow position={[-8,-18, 5]}/>
      <Arrow position={[-8,-18,10]}/>
      <Arrow position={[-8,-18,30]}/>
      <Arrow position={[-8,-18,35]}/>
      <Arrow position={[-8,-18,40]}/>
      <Arrow position={[-8,-18,45]}/>
      <Arrow position={[-8,-18,65]}/>
      <Arrow position={[-8,-18,70]}/>
      <Arrow position={[-8,-18,75]}/>
      <Arrow position={[-8,-18,80]}/>
      </group>
      <Lines position={[10, 18, 0]} scale={[1,1,3.5]}/>
      <Lines position={[-10, 18, 0]} scale={[1,1,3.5]}/>
      <Lines position={[-19, 0, 0]} scale={[0.3,0.3,3.5]}/>
      <Lines position={[19, 0, 0]} scale={[0.3,0.3,3.5]}/>
      <Logo3D position={[0, 0, 150]} ref={whiteElephantRef} />
      <Picture3D position={[9, 1, -50]} url={"/blank.jpg"} rotation={[0, 3.5, 0]} text='Challenges' />
      <Picture3D position={[-9, 1, -35]} url={"/blank.jpg"} rotation={[0, -3.5, 0]} text='Solutions'/>
      <Picture3D position={[9, 1, -20]} url={"/blank.jpg"} rotation={[0, 3.5, 0]} text='DEFI'/>
      <Picture3D position={[-9, 1, 5]} url={"/blank.jpg"} rotation={[0, -3.5, 0]} text='Features'/>
      <Picture3D position={[9, 1, 10]} url={"/blank.jpg"} rotation={[0, 3.5, 0]} text='Access'/>
      <Picture3D position={[-9, 1, 25]} url={"/blank.jpg"} rotation={[0, -3.5, 0]} text='Generate'/>
      <Picture3D position={[9, 1, 40]} url={"/blank.jpg"} rotation={[0, 3.5, 0]} text='Get In'/>
      <Picture3D position={[-9, 1, 55]} url={"/blank.jpg"} rotation={[0, -3.5, 0]} text='Partners'/>
      <Picture3D position={[9, 1, 70]} url={"/blank.jpg"} rotation={[0, 3.5, 0]} text='Challenges'/>
      <Picture3D position={[-9, 1, 85]} url={"/blank.jpg"} rotation={[0, -3.5, 0]} text='Team'/>

{/* 
      <Picture3D position={[9, 1, -50]} url={"/images/Challenges.jpeg"} rotation={[0, 3.5, 0]} text='Challenges' />
      <Picture3D position={[-9, 1, -35]} url={"/images/Solution.jpeg"} rotation={[0, -3.5, 0]} text='Solutions'/>
      <Picture3D position={[9, 1, -20]} url={"/images/DEFI.jpeg"} rotation={[0, 3.5, 0]} text='DEFI'/>
      <Picture3D position={[-9, 1, 5]} url={"/images/Features.jpeg"} rotation={[0, -3.5, 0]} text='Features'/>
      <Picture3D position={[9, 1, 10]} url={"/images/Access.jpeg"} rotation={[0, 3.5, 0]} text='Access'/>
      <Picture3D position={[-9, 1, 25]} url={"/images/Generate.jpeg"} rotation={[0, -3.5, 0]} text='Generate'/>
      <Picture3D position={[9, 1, 40]} url={"/images/Get In.jpeg"} rotation={[0, 3.5, 0]} text='Get In'/>
      <Picture3D position={[-9, 1, 55]} url={"/images/partners.jpeg"} rotation={[0, -3.5, 0]} text='Partners'/>
      <Picture3D position={[9, 1, 70]} url={"/images/Roadmap.jpeg"} rotation={[0, 3.5, 0]} text='Challenges'/>
      <Picture3D position={[-9, 1, 85]} url={"/images/Team.jpeg"} rotation={[0, -3.5, 0]} text='Team'/> */}
       {/* Adding light and bulb */}
        <pointLight position={[0, 0, 300]} intensity={5} castShadow receiveShadow isLight />
      <mesh position={[0, 0, 300]} scale={[30,30,30]} >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#230B5A" emissive="#230B5A" emissiveIntensity={20}   />
      </mesh>
      {/* <EffectComposer multisampling={2}>
        <Bloom intensity={3} luminanceThreshold={5} luminanceSmoothing={0.9} />
      </EffectComposer> */}
    </group>
  );
}

export default HexTunnel;

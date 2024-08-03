import React, { useRef } from 'react';
import * as THREE from 'three';

const Arrow = ({
    position = [-8, -18, 0],
    scale = [8, 4, 1],
    rotation = [Math.PI / 2, 0, 0],
    color = "#ffffff"
}) => {
    const mesh = useRef();

    // Define the Arrow shape (< or >)
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(1, 1);
    shape.lineTo(2, 0);
    shape.lineTo(1.5, 0);
    shape.lineTo(1, 0.5);
    shape.lineTo(0.5, 0);
    shape.lineTo(0, 0);

    // Extrude settings to give the shape some depth
    const extrudeSettings = {
        steps: 2,
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 1
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    return (
        <mesh ref={mesh} geometry={geometry} position={position} scale={scale} rotation={rotation}>
            <meshBasicMaterial attach="material" color={color} />
        </mesh>
    );
};

export default Arrow;

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

function Box() {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
     <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="skyblue"
        transmission={1}   // full glass effect
        opacity={0.5}
        transparent
        roughness={0}
        metalness={0}
        reflectivity={1}
        clearcoat={1}
        clearcoatRoughness={0}
      />
    </mesh>
  );
}

export default function ThreeModel() {
  return (
    <Canvas style={{ height: 400, width: "100%" ,background:"black"}}>
      {/* Background Stars */}
      
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* Rotating Cube */}
      <Box />

      {/* Orbit controls */}
      <OrbitControls />
    </Canvas>
  );
}

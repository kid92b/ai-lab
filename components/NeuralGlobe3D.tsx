"use client";

import React, { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// детерминированный RNG, чтобы SSR/CSR совпадали
function createRng(seed = 20250325) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function Globe() {
  const pointsGeometry = useMemo(() => {
    const rand = createRng();
    const count = 600;
    const points = new Float32Array(count * 3);
    const radius = 1.02;

    for (let i = 0; i < count; i++) {
      const u = rand();
      const v = rand();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      points[i * 3 + 0] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return geom;
  }, []);

  return (
    <group scale={1.05} rotation={[0.18, 0.3, 0]}>
      <mesh>
        {/* аккуратная сфера-сетка с небольшим объёмом */}
        <sphereGeometry args={[0.9, 64, 64]} />
        <meshStandardMaterial
          color="#7CE4FF"
          wireframe
          emissive="#5CC9FF"
          emissiveIntensity={0.4}
        />
      </mesh>

      <points geometry={pointsGeometry}>
        <pointsMaterial
          color="#a5f3fc"
          size={0.03}
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>
    </group>
  );
}

export function NeuralGlobe3D() {
  return (
    <div className="h-full w-full">
      <Canvas
        className="h-full w-full !bg-transparent"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor("transparent", 0);
          scene.background = null;
        }}
      >
        {/* базовый свет, без лишних эффектов */}
        <ambientLight intensity={0.45} />
        <directionalLight intensity={1.1} position={[3, 4, 2]} />

        {/* плавное вращение мышкой как по маслу */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          autoRotate
          autoRotateSpeed={1.8}
        />

        <Globe />
      </Canvas>
    </div>
  );
}

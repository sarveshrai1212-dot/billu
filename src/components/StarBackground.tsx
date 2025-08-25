"use client";

import React, { useState, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const STAR_COUNT = 1500; // 1500 stars, 3*1500 = 4500 positions

const StarBackground = (props: Record<string, unknown>) => {
  const ref = useRef<THREE.Points>(null);
  const [sphere] = useState(() => {
    const arr = random.inSphere(new Float32Array(3 * STAR_COUNT), { radius: 1.2 });
    // Debug: check for NaN values
    if (arr.some((v) => Number.isNaN(v))) {
      console.error('Star positions contain NaN values!', arr);
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });


  return (
    <group rotation={[0,0, Math.PI / 4]}>
        <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
        >
            <PointMaterial
                transparent
                color="#a259ff"
                size={0.002}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    </group>
  )
};

const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{position: [0, 0, 1]}}>
        <Suspense fallback={null}>
            <StarBackground />
        </Suspense>
        </Canvas>
    </div>
)

export default StarsCanvas;

"use client"; // This is a client component 👈🏽

import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";

export default function Home() {
  return (
    <>
      <Canvas className="relative z-0" shadows camera={{ position: [0, 0, 16], fov: 50 }} >
        {/* Performance enhancers */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Performance enhancers */}
        <Suspense fallback={<Loader />}>
          <Experience />
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

"use client"; // This is a client component 👈🏽

import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import OverlayButtons from "./components/UI";
import { useActivePortalStore } from "./components/state-management/activePortal";

export default function Home() {
  const { activePortal } = useActivePortalStore();

  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 16], fov: 45 }} >
        {/* Performance enhancers */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        {/* Performance enhancers */}
        <Suspense fallback={<Loader />}>
          <Experience />
          <EffectComposer>
            <Bloom mipmapBlur intensity={1.2} />
          </EffectComposer>
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

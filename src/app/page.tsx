'use client'; // This is a client component 👈🏽

import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Suspense } from 'react';
import Loader from './components/Loader';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from '@react-three/drei';
import OverlayButtons from './components/UI/Navigation';

export default function Home() {

  return (
    <>
      <OverlayButtons />
      <Canvas
        shadows
        flat
        camera={{ position: [0, 0, 16], fov: 45, isPerspectiveCamera: true }}
      >
        {/* Performance enhancers */}
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />

        {/* Performance enhancers */}
        <Suspense fallback={<Loader />}>
          <Experience />
          {/*<EffectComposer>
            <Bloom mipmapBlur intensity={1.2} />
          </EffectComposer>*/}
          <Preload all />
        </Suspense>
      </Canvas>
    </>
  );
}

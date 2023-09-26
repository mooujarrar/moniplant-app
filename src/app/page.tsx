"use client"; // This is a client component 👈🏽

import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Overlay from "./components/Overlay";

export default function Home() {
  return (
    <>
      {/*<Overlay />*/}
      <Canvas className="relative z-0" shadows camera={{ position: [0, 0, 16], fov: 40 }}>
        <color attach='background' args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
}

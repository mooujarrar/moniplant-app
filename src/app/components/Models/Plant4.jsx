/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 -o src/app/components/Plant4.jsx -r public public/models/plant4.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Plant4(props) {
  const { nodes, materials } = useGLTF('/models/plant4.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, -1.353, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[2.971, 3.372, 2.65]}>
        <mesh geometry={nodes.awa_outdoor002.geometry} material={materials['Material.007']} />
        <mesh geometry={nodes.awa_outdoor002_1.geometry} material={materials['Blatt.002']} />
        <mesh geometry={nodes.awa_outdoor002_2.geometry} material={materials['Material.005']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/plant4.glb')

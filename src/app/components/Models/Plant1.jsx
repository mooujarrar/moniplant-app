/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/models/plant1.glb -o src/app/components/Plant1.jsx -r public 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { usePortalStore } from '../state-management/activePortal'
import { Tablet } from './Tablet';
import { motion } from "framer-motion-3d"
import { PLANT_SPRING, PLANT_VISIBILITY_VARIANTS } from '../AnimationConstants';
import PlantCard from '../UI/PlantCard';
import { PLANT_1_FITTING_BOX_NAME } from '../Positions';

export function Plant1(props) {
  const { nodes, materials } = useGLTF('/models/plant1.glb')
  const { activePortal, hoveredPortal } = usePortalStore();
  return (
    <group {...props} dispose={null}>
      {/*<mesh name={PLANT_1_FITTING_BOX_NAME} position={[-1, -1, 1]} visible={false}>
        <meshBasicMaterial opacity={0.5} transparent color={'#00ff00'} />
        <boxGeometry args={[4, 4, 1]} />
      </mesh>*/}
      <PlantCard visibility={!activePortal && hoveredPortal === props.name ? 'visible' : 'hidden'} plantName={props.name} />
      {activePortal === props.name && <Tablet props/>}
      <group position-y={-3} rotation={[Math.PI / 2, 0, 0]} scale={2.5}>
        <motion.mesh geometry={nodes.awa_outdoor.geometry} variants={PLANT_VISIBILITY_VARIANTS} transition={PLANT_SPRING} initial='visible' animate={(activePortal === props.name || activePortal === null) ? 'visible' : 'hidden' } material={materials['Material.002']}  />
        <motion.mesh geometry={nodes.awa_outdoor_1.geometry} variants={PLANT_VISIBILITY_VARIANTS} transition={PLANT_SPRING} initial='visible' animate={(activePortal === props.name || activePortal === null) ? 'visible' : 'hidden' } material={materials['10461_Yucca_Plant_v1']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/plant1.glb')

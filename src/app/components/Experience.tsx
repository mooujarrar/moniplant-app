import {
  CameraControls,
  Environment,
  useFont,
} from '@react-three/drei';
import { Monitoring } from './Monitoring';
import { EPage, useActivePageStore } from './state-management/activePage';
import { useActivePortalStore } from './state-management/activePortal';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Lobby } from './Lobby';
import {
  CAMERA_INITIAL_POSITION,
  CAMERA_INSIDE_PORTAL_POSITION,
  HOME_POSITION,
  MONITOR_POSITION,
} from './Positions';

export const Experience = () => {
  const { activePage } = useActivePageStore();
  const { activePortal } = useActivePortalStore();
  const controlsRef = useRef<CameraControls>(null);

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    const cameraControl = controlsRef.current;
    if (cameraControl) {
      if (activePage === EPage.MONITOR) {
        if (activePortal) {
          const targetPosition = new THREE.Vector3();
          scene.getObjectByName(activePortal)?.getWorldPosition(targetPosition);
          cameraControl.setLookAt(
            CAMERA_INSIDE_PORTAL_POSITION.x,
            CAMERA_INSIDE_PORTAL_POSITION.y,
            CAMERA_INSIDE_PORTAL_POSITION.z,
            targetPosition.x,
            targetPosition.y,
            targetPosition.z,
            true
          );
        } else {
          cameraControl.setLookAt(
            CAMERA_INITIAL_POSITION.x,
            CAMERA_INITIAL_POSITION.y,
            CAMERA_INITIAL_POSITION.z,
            MONITOR_POSITION.x,
            MONITOR_POSITION.y,
            MONITOR_POSITION.z,
            true
          );
        }
      } else if (activePage === EPage.HOME) {
        cameraControl.setLookAt(
          CAMERA_INITIAL_POSITION.x,
          CAMERA_INITIAL_POSITION.y,
          CAMERA_INITIAL_POSITION.z,
          HOME_POSITION.x,
          HOME_POSITION.y,
          HOME_POSITION.z,
          true
        );
      }
    }
  }, [activePage, activePortal, scene]);
  return (
    <>
      <ambientLight />
      <hemisphereLight groundColor='green' />
      <Environment background preset='sunset' blur={0.8} />
      <CameraControls
        makeDefault
        ref={controlsRef}
        distance={16}
        mouseButtons={{ wheel: 0, left: 0, right: 0, middle: 0 }}
        touches={{ one: 0, two: 0, three: 0 }}
      />
      <Monitoring />
      <Lobby />
    </>
  );
};

useFont.preload('/fonts/Bebas Neue_Regular.json');

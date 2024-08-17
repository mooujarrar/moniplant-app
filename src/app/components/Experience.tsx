import { CameraControls, Environment, useFont } from '@react-three/drei';
import { EPlants, Monitoring } from './Monitoring';
import { EPage, useActivePageStore } from './state-management/activePage';
import { usePortalStore } from './state-management/activePortal';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Lobby } from './Lobby';
import {
  CAMERA_INITIAL_POSITION,
  CAMERA_INSIDE_PORTAL_POSITION,
  HOME_POSITION,
  LOBBY_FITTING_BOX_NAME,
  MONITOR_FITTING_BOX_NAME,
  MONITOR_POSITION,
  PLANT_1_FITTING_BOX_NAME,
  PLANT_2_FITTING_BOX_NAME,
  PLANT_3_FITTING_BOX_NAME,
  PLANT_4_FITTING_BOX_NAME,
  PLANT_5_FITTING_BOX_NAME,
} from './Positions';

export const Experience = () => {
  const { activePage } = useActivePageStore();
  const { activePortal } = usePortalStore();
  const controlsRef = useRef<CameraControls>(null);

  const scene = useThree((state) => state.scene);

  const fitCamera = async () => {
    // We dont use the states above because this is an async arrow function that doesn't get the changes out of its scope
    const activePage = useActivePageStore.getState().activePage;
    const activePortal = usePortalStore.getState().activePortal;

    const cameraControl = controlsRef.current;
    if (cameraControl) {
      let fittingBox = undefined;
      if (activePage === EPage.HOME) {
        fittingBox = scene.getObjectByName(LOBBY_FITTING_BOX_NAME);
        if (fittingBox) {
          cameraControl.fitToBox(fittingBox, true);
        }
      } else if (activePage === EPage.MONITOR && activePortal === null) {
        fittingBox = scene.getObjectByName(MONITOR_FITTING_BOX_NAME);
        if (fittingBox) {
          cameraControl.fitToBox(fittingBox, true);
        }
      }
    }
  };

  const debounce = (
    func: any,
    time = 100
  ) => {
    let timer: string | number | NodeJS.Timeout | undefined;
    return function (event: any) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, time, event);
    };
  };

  const getPlantFittingBoxName = (plant: EPlants) => {
    switch(plant) {
      case EPlants.PLANT1: return PLANT_1_FITTING_BOX_NAME;
      case EPlants.PLANT2: return PLANT_2_FITTING_BOX_NAME;
      case EPlants.PLANT3: return PLANT_3_FITTING_BOX_NAME;
      case EPlants.PLANT4: return PLANT_4_FITTING_BOX_NAME;
      case EPlants.PLANT5: return PLANT_5_FITTING_BOX_NAME;
    }
  };
  
  useEffect(() => {
    window.addEventListener('resize', debounce(fitCamera, 150), false);
    return () => window.removeEventListener('resize', debounce(fitCamera, 150));
  }, []);

  useEffect(() => {
    const cameraControl = controlsRef.current;
    if (cameraControl) {
      if (activePage === EPage.MONITOR) {
        if (activePortal) {
          /*const plantFittingBox = scene.getObjectByName(getPlantFittingBoxName(activePortal as EPlants));
          if (plantFittingBox) {
            cameraControl.fitToBox(plantFittingBox, true);
          }*/
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
          fitCamera();
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
        fitCamera();
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

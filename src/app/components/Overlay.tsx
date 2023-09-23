import { useEffect } from "react";
import PlantInfoCard from "./PlantInfoCard";
import useStore from "./state-management/activePortal";

function Overlay() {
    const active = useStore((state: any) => state.active);
    useEffect(() => {
    }, [active])
    return (
        <div className="absolute left-20 top-14 z-1" >
            {active && <PlantInfoCard />}
        </div>
    );
  }
  
  export default Overlay;
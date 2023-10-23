import { useLoader } from "@react-three/fiber";
import { forwardRef, useEffect, useState } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";
import * as satellite from "satellite.js";
import {
    splitTLE,
    calcSatPosition,
    calcSatRotation,
} from "../../utils/satelliteHelpers.ts";
import { useSatDataContext } from "../../context/SatelliteDataContext.tsx";
//import { SatComponentProps } from "../../types/SatelliteComponent.ts";

// const TLE = `1 25544U 98067A   23262.35054104  .00014745  00000-0  27129-3 0  9992
// 2 25544  51.6415 222.0994 0005856  35.8467 129.0291 15.49409802416398`;

export const Satellite = forwardRef((props, ref) => {
    const { tleData } = props;
    const { satName: satName, orbitData } = splitTLE(tleData);
    const satData = useSatDataContext();
    const [position, setPosition] = useState<THREE.Vector3>(
        new THREE.Vector3()
    );
    const [rotation, setRotation] = useState<THREE.Euler>(new THREE.Euler());
    const fbx = useLoader(
        FBXLoader,
        import.meta.env.BASE_URL + "assets/models/iss/iss.fbx"
        //import.meta.env.BASE_URL + "/assets/models/iss/iss.fbx"
    );

    useEffect(() => {
        const satrec = satellite.twoline2satrec(orbitData[0], orbitData[1]);
        const interval = setInterval(() => {
            const now = new Date();
            const gmst = satellite.gstime(now);
            const eci = satellite.propagate(satrec, now);

            if (eci.position) {
                const gdPos = satellite.eciToGeodetic(
                    eci.position as satellite.EciVec3<number>,
                    gmst
                );
                const lat = satellite.degreesLat(gdPos.latitude);
                const lon = satellite.degreesLong(gdPos.longitude);
                const alt = gdPos.height;

                satData.setSatData({ satName, lat, lon, alt });

                setPosition(calcSatPosition(lon, lat, alt));
                setRotation(calcSatRotation(lat, lon));
            }
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [tleData]);

    return (
        <>
            <group ref={ref} position={position} rotation={rotation}>
                <primitive object={fbx} scale={0.02} />
                <spotLight
                    position={[0, 0, 0]}
                    penumbra={0.5}
                    decay={2}
                    intensity={5}
                    color={"#506886"} //Moonlight white
                    angle={0.8}
                />
            </group>
        </>
    );
});

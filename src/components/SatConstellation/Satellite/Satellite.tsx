//import { useLoader } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
//import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Euler, Group, Vector3 } from "three";
import {
    twoline2satrec,
    gstime,
    propagate,
    eciToGeodetic,
    EciVec3,
    degreesLat,
    degreesLong,
} from "satellite.js";
import { nameAndOrbitFromTLE } from "../../../utils/dataParsers.ts";
import {
    calcSatPosition,
    calcSatRotation,
} from "../../../utils/satelliteHelpers.ts";
import { useSatDataContext } from "../../../contexts/SatelliteDataContext.tsx";
import { TLEData } from "../../../types/SatelliteDataType.ts";

export const Satellite = forwardRef(
    ({ tleData }: TLEData, ref: ForwardedRef<Group>) => {
        const nameAndOrbit = nameAndOrbitFromTLE(tleData);
        //const satData = useSatDataContext();
        const [position, setPosition] = useState<Vector3>(new Vector3());
        const [rotation, setRotation] = useState<Euler>(new Euler());
        // const fbx = useLoader(
        //     FBXLoader,
        //     import.meta.env.BASE_URL + "assets/models/iss/iss.fbx"
        // );

        useEffect(() => {
            const satrec = twoline2satrec(
                nameAndOrbit.orbitData[0],
                nameAndOrbit.orbitData[1]
            );
            const interval = setInterval(() => {
                const now = new Date();
                const gmst = gstime(now);
                const eci = propagate(satrec, now);

                if (eci.position) {
                    const gdPos = eciToGeodetic(
                        eci.position as EciVec3<number>,
                        gmst
                    );
                    const lat = degreesLat(gdPos.latitude);
                    const lon = degreesLong(gdPos.longitude);
                    const alt = gdPos.height;

                    //satData.setSatData({ satName, lat, lon, alt });

                    setPosition(calcSatPosition(lon, lat, alt));
                    setRotation(calcSatRotation(lat, lon));
                }
            }, 16);
            return () => {
                clearInterval(interval);
            };
        }, [tleData]);

        return (
            <>
                {position && rotation && (
                    <group ref={ref} position={position} rotation={rotation}>
                        <mesh>
                            <sphereGeometry args={[0.01, 24, 12]} />
                            <meshStandardMaterial color={"orange"} />
                            {/* <ambientLight intensity={2} /> */}
                        </mesh>
                        {/* <spotLight
                position={[0, 0, 0]}
                penumbra={0.2}
                decay={2}
                intensity={5}
                color={"#506886"} //Moonlight white
                angle={1}
            /> */}
                    </group>
                )}
            </>
        );
    }
);

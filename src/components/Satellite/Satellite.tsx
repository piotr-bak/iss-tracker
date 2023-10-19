import { useLoader } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import * as THREE from "three";
import * as satellite from "satellite.js";
import {
    splitTLE,
    calcSatPosition,
    calcSatRotation,
} from "../../utils/satelliteHelpers.ts";

const TLE = `1 25544U 98067A   23262.35054104  .00014745  00000-0  27129-3 0  9992
2 25544  51.6415 222.0994 0005856  35.8467 129.0291 15.49409802416398`;

export function Satellite() {
    const [position, setPosition] = useState<THREE.Vector3>(
        new THREE.Vector3()
    );
    const [rotation, setRotation] = useState<THREE.Euler>(new THREE.Euler());
    const fbx = useLoader(FBXLoader, "/assets/models/iss/iss.fbx");

    useEffect(() => {
        const satrec = satellite.twoline2satrec(
            ...(splitTLE(TLE) as [string, string])
        );
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

                setPosition(calcSatPosition(lon, lat, alt));
                setRotation(calcSatRotation(lat, lon));
            }
        }, 333);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <group position={position} rotation={rotation}>
            <primitive object={fbx} scale={0.01} />
        </group>
    );
}

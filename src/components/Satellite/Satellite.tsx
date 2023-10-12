import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EARTH_RADIUS, MODEL_SCALE } from "../../constants/earthConstants.js";
import * as THREE from "three";
import * as satellite from "satellite.js";

const TLE = `1 25544U 98067A   23262.35054104  .00014745  00000-0  27129-3 0  9992
2 25544  51.6415 222.0994 0005856  35.8467 129.0291 15.49409802416398`;

const splitTLE = (twoLineElement: string): string[] => {
    return twoLineElement.split("\n").map((line) => line.trim());
};

export function Satellite() {
    const [position, setPosition] = useState<THREE.Vector3>(
        new THREE.Vector3()
    );
    const [rotation, setRotation] = useState<THREE.Euler>(new THREE.Euler());
    const fbx = useLoader(FBXLoader, "src/assets/models/iss/iss.fbx");

    function degreesToRadians(deg) {
        return deg * (Math.PI / 180);
    }
    function geoToSpherical(lat, lon, alt = 0) {
        const phi = degreesToRadians(lat);
        const theta = degreesToRadians(lon);
        const radius = ((EARTH_RADIUS + alt) / EARTH_RADIUS) * MODEL_SCALE;

        return {
            phi,
            theta,
            radius,
        };
    }

    function calculatePosition(lat, lon, alt) {
        const { phi, theta, radius } = geoToSpherical(lon, lat, alt);
        const x = Math.cos(phi) * Math.cos(theta) * radius;
        const y = Math.sin(phi) * radius;
        const z = -Math.cos(phi) * Math.sin(theta) * radius;
        return new THREE.Vector3(x, y, z);
    }

    function calculateRotation(lat, lon) {
        const { phi, theta } = geoToSpherical(lat, lon);
        const x = 0;
        const y = theta;
        const z = phi * Math.PI * 0.5;
        return new THREE.Euler(x, y, z);
    }

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

                setPosition(calculatePosition(lon, lat, alt));
                setRotation(calculateRotation(lat, lon));
            }
        }, 333);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <group position={position} rotation={rotation}>
            <primitive object={fbx} scale={0.02} />
        </group>
    );
}

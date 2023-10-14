import { useRef } from "react";
import { Satellite } from "../Satellite/Satellite.tsx";
import { useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import textureEarthDay from "/assets/textures/8k_earth_daymap.webp";
import textureEmissiveMap from "/assets/textures/earth_lights.gif";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Globe() {
    const baseMap = useLoader(THREE.TextureLoader, textureEarthDay);
    const lightsMap = useLoader(THREE.TextureLoader, textureEmissiveMap);
    const ref = useRef<THREE.Mesh<THREE.SphereGeometry>>(null);

    return (
        <>
            <Sphere castShadow ref={ref} args={[MODEL_SCALE, 128, 64]}>
                <meshStandardMaterial
                    map={baseMap}
                    emissiveMap={lightsMap}
                    emissive={"#EBCD84"}
                    emissiveIntensity={0.8}
                />
            </Sphere>
            <Satellite />
        </>
    );
}

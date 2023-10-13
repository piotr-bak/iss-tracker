import { useEffect, useRef } from "react";
import { Satellite } from "../Satellite/Satellite.tsx";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import textureEarthDay from "/assets/textures/8k_earth_daymap.webp";
import { MODEL_SCALE } from "../../constants/earthConstants.js";

export function Globe() {
    const base = useLoader(THREE.TextureLoader, textureEarthDay);
    const ref = useRef();

    return (
        <>
            <Sphere castShadow ref={ref} args={[MODEL_SCALE, 128, 64]}>
                <meshStandardMaterial map={base} />
            </Sphere>
            <Satellite />
        </>
    );
}

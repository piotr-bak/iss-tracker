import { useRef } from "react";
import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import textureEarthDay from "/assets/textures/8k_earth_daymap.webp";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Earth() {
    const baseMap = useTexture(textureEarthDay);
    const ref = useRef<THREE.Mesh<THREE.SphereGeometry>>(null);

    return (
        <>
            <Sphere
                castShadow
                ref={ref}
                args={[MODEL_SCALE, 128, 64]}
                layers={0}>
                <meshStandardMaterial map={baseMap} />
            </Sphere>
        </>
    );
}

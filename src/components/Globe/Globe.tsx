import { useRef } from "react";
import { Sphere, useTexture } from "@react-three/drei";
import textureEarth from "/assets/textures/earth.webp";
import textureBumpMap from "/assets/textures/bump.webp";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Globe() {
    const baseMap = useTexture(textureEarth);
    const bumpMap = useTexture(textureBumpMap);

    const ref = useRef<THREE.Mesh<THREE.SphereGeometry>>(null);

    return (
        <Sphere castShadow ref={ref} args={[MODEL_SCALE, 128, 64]}>
            <meshStandardMaterial
                map={baseMap}
                bumpMap={bumpMap}
                bumpScale={0.005}
            />
        </Sphere>
    );
}

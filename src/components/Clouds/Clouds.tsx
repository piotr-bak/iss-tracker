import { useRef } from "react";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import textureClouds from "/assets/textures/clouds.webp";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Clouds() {
    const clouds = useTexture(textureClouds);
    const ref = useRef<THREE.Mesh<THREE.SphereGeometry>>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += 0.0025 * delta;
            ref.current.rotation.z += 0.0025 * delta;
        }
    });

    return (
        <Sphere args={[MODEL_SCALE + 0.004, 128, 64]} ref={ref}>
            <meshPhongMaterial alphaMap={clouds} transparent />
        </Sphere>
    );
}

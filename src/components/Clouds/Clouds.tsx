import { useRef } from "react";
import { Mesh, SphereGeometry } from "three";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import textureClouds from "/assets/textures/clouds.webp";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Clouds() {
    const clouds = useTexture(textureClouds);
    const ref = useRef<Mesh<SphereGeometry>>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += 0.003 * delta;
            ref.current.rotation.z += 0.003 * delta;
        }
    });

    return (
        <Sphere args={[MODEL_SCALE + 0.01, 128, 64]} ref={ref}>
            <meshPhongMaterial alphaMap={clouds} transparent />
        </Sphere>
    );
}

import { useEffect, useRef } from "react";
import * as satellite from "satellite.js";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import textureEarthDay from "../../assets/textures/2k_earth_daymap.jpg";

export function Globe() {
    const base = new THREE.TextureLoader().load(textureEarthDay);
    const ref = useRef();
    useFrame(() => {
        ref.current.rotation.y += 0.001;
    });
    useEffect(() => {
        ref.current.rotation.x = 0.41;
    }, []);

    return (
        <mesh visible castShadow ref={ref}>
            <directionalLight intensity={0.5} />
            <sphereGeometry attach='geometry' args={[2, 128, 64]} />
            <meshBasicMaterial map={base} />
        </mesh>
    );
}

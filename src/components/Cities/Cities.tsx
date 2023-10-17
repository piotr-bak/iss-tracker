import { Sphere, useTexture } from "@react-three/drei";
import * as THREE from "three";
import textureEmissiveMap from "/assets/textures/earth_lights.gif";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";

export function Cities() {
    const cityOutlines = useTexture(textureEmissiveMap);

    const citiesMaterial = new THREE.MeshLambertMaterial({
        transparent: true,
        alphaMap: cityOutlines,
        color: new THREE.Color(163, 169, 133),
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });

    return (
        <>
            <Sphere castShadow args={[MODEL_SCALE, 128, 64]} layers={0}>
                <meshStandardMaterial {...citiesMaterial} />
            </Sphere>
        </>
    );
}

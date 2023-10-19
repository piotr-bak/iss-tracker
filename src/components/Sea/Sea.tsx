import { Sphere, useTexture } from "@react-three/drei";
import { MODEL_SCALE } from "../../constants/earthConstants.ts";
import textureAlphaMap from "/assets/textures/alpha.webp";

export function Sea() {
    const alphaMap = useTexture(textureAlphaMap);

    return (
        <Sphere args={[MODEL_SCALE, 128, 64]}>
            <meshPhongMaterial
                color={"#091E42"}
                transparent
                opacity={0.45}
                alphaMap={alphaMap}
                specular={0x222222}
                shininess={60}
            />
        </Sphere>
    );
}

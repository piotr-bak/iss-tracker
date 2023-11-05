import { Atmosphere } from "./Atmosphere/Atmosphere.tsx";
import { Clouds } from "./Clouds/Clouds.tsx";
import { Globe } from "./Globe/Globe.tsx";
import { Sea } from "./Sea/Sea.tsx";
import vertexShader from "../";

export function Earth() {
    return (
        <>
            <Globe />
            <Sea />
            <Clouds />
            <Atmosphere />
            {/* <shaderMaterial vertexShader={} fragmentShader={} /> */}
        </>
    );
}

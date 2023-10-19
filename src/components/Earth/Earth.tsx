import { Clouds } from "../Clouds/Clouds.tsx";
import { Globe } from "../Globe/Globe.tsx";
import { Sea } from "../Sea/Sea.tsx";

export function Earth() {
    return (
        <>
            <Globe />
            <Sea />
            <Clouds />
        </>
    );
}

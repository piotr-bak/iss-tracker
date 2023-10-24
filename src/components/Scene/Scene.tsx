import { Group } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Earth } from "../Earth/Earth.tsx";
import { Satellite } from "../Satellite/Satellite.tsx";
import { useRef } from "react";
import { useLoadingContext } from "../../contexts/LoadingContext.tsx";
import { DEFAULT_VECTOR } from "../../constants/earthConstants.ts";
import { useFetch } from "../../hooks/useFetch.ts";
import { ORBITAL_DATA_URL } from "../../constants/orbitalDataUrl.ts";

export function Scene() {
    const issRef = useRef<Group>(null);
    const { camera } = useThree();
    const isInitialPositionSet = useRef(false);
    const { setIsLoaded } = useLoadingContext();

    const tle = useFetch({
        url: ORBITAL_DATA_URL,
        options: undefined,
        logErrors: true,
    });

    useFrame(() => {
        if (issRef.current) {
            if (
                !isInitialPositionSet.current &&
                !issRef.current.position.equals(DEFAULT_VECTOR)
            ) {
                camera.position.copy(issRef.current.position);
                //camera.lookAt([0, 0, 0]);
                isInitialPositionSet.current = true;
                setIsLoaded(true);
            }
        }
    });
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 0]} />
            <OrbitControls minDistance={3} maxDistance={50} />
            <ambientLight intensity={1} />
            <directionalLight
                color='#fffff5'
                position={[0, 0, 5]}
                intensity={5}
            />
            <Stars
                radius={150}
                depth={50}
                count={5000}
                factor={1}
                saturation={0}
                speed={1}
            />
            <Earth />
            {tle.data && <Satellite tleData={tle.data} ref={issRef} />}
        </>
    );
}

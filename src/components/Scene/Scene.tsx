import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Earth } from "../Earth/Earth.tsx";
import { Satellite } from "../Satellite/Satellite.tsx";
import { useRef } from "react";
import { DEFAULT_VECTOR } from "../../constants/earthConstants.ts";

export function Scene() {
    const issRef = useRef();
    const { camera } = useThree();
    const isInitialPositionSet = useRef(false);

    useFrame(() => {
        if (issRef.current) {
            if (
                !isInitialPositionSet.current &&
                !issRef.current.position.equals(DEFAULT_VECTOR)
            ) {
                camera.position.copy(issRef.current.position);
                console.log("render frame");
                //camera.lookAt([0, 0, 0]);
                isInitialPositionSet.current = true;
            }
        }
    });
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <OrbitControls minDistance={2.75} maxDistance={50} />
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
            <Satellite ref={issRef} />
        </>
    );
}

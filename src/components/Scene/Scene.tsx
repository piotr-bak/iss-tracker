import { Vector3, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { Earth } from "../Earth/Earth.tsx";
import { Satellite } from "../Satellite/Satellite.tsx";
import { useRef } from "react";
import { DEFAULT_VECTOR } from "../../constants/earthConstants.ts";

export function Scene() {
    const issRef = useRef();
    const cameraRef = useRef();
    const initialPositionSet = useRef(false);

    useFrame(() => {
        if (
            !initialPositionSet.current &&
            !issRef.current.position.equals(DEFAULT_VECTOR)
        ) {
            cameraRef.current.position.lerp(issRef.current.position, 1);
            cameraRef.current.lookAt([0, 0, 0]);
            initialPositionSet.current = true;
        }
    });
    return (
        <>
            <PerspectiveCamera
                makeDefault
                position={[0, 0, 3.5]}
                ref={cameraRef}
            />
            <OrbitControls minDistance={3.5} maxDistance={50} />
            <ambientLight intensity={0.2} />
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

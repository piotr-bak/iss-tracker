import { useFrame } from "@react-three/fiber";
import { ForwardedRef, forwardRef, useRef } from "react";
import { Euler, Group, Vector3 } from "three";

type SatelliteProps = {
    position: number[];
    rotation: number[];
};

export const Satellite = forwardRef(function Satellite(
    { position, rotation }: SatelliteProps,
    ref: ForwardedRef<Group>
) {
    return (
        <>
            <group ref={ref} position={position} rotation={rotation}>
                <mesh>
                    <sphereGeometry args={[0.01, 24, 12]} />
                    <meshStandardMaterial color={"orange"} />
                </mesh>
            </group>
        </>
    );
});

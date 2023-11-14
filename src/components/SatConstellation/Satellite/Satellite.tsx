import { ForwardedRef, forwardRef } from "react";
import { Euler, Group, Vector3 } from "three";

interface SatelliteProps {
    position: Vector3;
    rotation: Euler;
}

export const Satellite = forwardRef(
    ({ position, rotation }: SatelliteProps, ref: ForwardedRef<Group>) => {
        return (
            <>
                {position && rotation && (
                    <group ref={ref} position={position} rotation={rotation}>
                        <mesh>
                            <sphereGeometry args={[1, 24, 12]} />
                            <meshStandardMaterial color='orange' />
                        </mesh>
                    </group>
                )}
            </>
        );
    }
);

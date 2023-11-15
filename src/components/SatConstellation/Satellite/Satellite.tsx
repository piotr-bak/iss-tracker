import { ForwardedRef, forwardRef } from "react";
import { Euler, Group, Vector3 } from "three";

// type SatelliteProps = {
//     position: number[] | ArrayLike<number>;
//     rotation: number[] | EulerOrder;
// };

export const Satellite = forwardRef(
    ({ position, rotation }: number[], ref: ForwardedRef<Group>) => {
        return (
            <>
                {position && rotation && (
                    <group
                        ref={ref}
                        position={new Vector3().fromArray(position)}
                        rotation={new Euler().fromArray(rotation)}>
                        <mesh>
                            <sphereGeometry args={[0.005, 4, 3]} />
                            <meshStandardMaterial color='orange' />
                        </mesh>
                    </group>
                )}
            </>
        );
    }
);

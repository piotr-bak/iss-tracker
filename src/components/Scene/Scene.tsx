import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Cities } from "../Cities/Cities.tsx";
import { Earth } from "../Earth/Earth.tsx";
import styles from "./Scene.module.scss";
import { Satellite } from "../Satellite/Satellite.tsx";

export function Scene() {
    return (
        <div className={styles.container}>
            <Canvas>
                <ambientLight intensity={0.1} />
                <directionalLight
                    color='#fffff5'
                    position={[0, 0, 4]}
                    intensity={2}
                    layers={0}
                />
                <directionalLight
                    color='red' // Adjust the color of the second light
                    position={[0, 0, -4]} // Position it on the opposite side
                    intensity={10} // Adjust the intensity as needed
                    layers={1} // Only affect objects on layer 1
                />
                <OrbitControls />
                <Stars
                    radius={150}
                    depth={50}
                    count={5000}
                    factor={1}
                    saturation={0}
                    speed={1}
                />
                <Earth />
                <Cities />
                <Satellite />
            </Canvas>
        </div>
    );
}

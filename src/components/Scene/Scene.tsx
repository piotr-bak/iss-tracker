import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Globe } from "../Globe/Globe.tsx";
import styles from "./Scene.module.scss";

export function Scene() {
    return (
        <div className={styles.container}>
            <Canvas>
                <ambientLight intensity={0.3} />
                <directionalLight
                    color='#fffff5'
                    position={[0, 0, 5]}
                    intensity={5}
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
                <Globe />
            </Canvas>
        </div>
    );
}

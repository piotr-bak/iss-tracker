import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "./Scene/Scene.tsx";
import "./App.scss";

export function App() {
    return (
        <div className='container'>
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    );
}

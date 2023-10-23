import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene/Scene.tsx";
import { SatelliteDataContextProvider } from "../context/SatelliteDataContext.tsx";
import { Infopanel } from "./Infopanel/Infopanel.tsx";
import "./App.scss";

export function App() {
    return (
        <div className='container'>
            <SatelliteDataContextProvider>
                <Canvas>
                    <Scene />
                </Canvas>
                <Infopanel />
            </SatelliteDataContextProvider>
        </div>
    );
}

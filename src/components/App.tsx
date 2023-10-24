import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene/Scene.tsx";
import { SatelliteDataContextProvider } from "../contexts/SatelliteDataContext.tsx";
import { Infopanel } from "./Infopanel/Infopanel.tsx";
import "./App.scss";
import { LoadingContextProvider } from "../contexts/LoadingContext.tsx";
import { LoadingScreen } from "./LoadingScreen/LoadingScreen.tsx";

export function App() {
    return (
        <div className='container'>
            <LoadingContextProvider>
                <LoadingScreen />
                <SatelliteDataContextProvider>
                    <Canvas>
                        <Scene />
                    </Canvas>
                    <Infopanel />
                </SatelliteDataContextProvider>
            </LoadingContextProvider>
        </div>
    );
}

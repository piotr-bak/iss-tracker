import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { SATELLITE_DATA_OBJECT } from "../constants/satelliteDataObject.ts";

type SatelliteData = {
    lat: number;
    lon: number;
    alt: number;
};

type SatelliteContextType = {
    satData: SatelliteData;
    setSatData: Dispatch<SetStateAction<SatelliteData>>;
};

export const SatelliteDataContext = createContext<SatelliteContextType>({
    satData: SATELLITE_DATA_OBJECT,
    setSatData: () => {},
});

export function SatelliteDataContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [satData, setSatData] = useState(SATELLITE_DATA_OBJECT);
    return (
        <SatelliteDataContext.Provider value={{ satData, setSatData }}>
            {children}
        </SatelliteDataContext.Provider>
    );
}

export function useSatDataContext() {
    return useContext(SatelliteDataContext);
}

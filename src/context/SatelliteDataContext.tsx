import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";

import { SatData } from "../types/SatelliteDataType.ts";

import { SATELLITE_DATA_OBJECT } from "../constants/satelliteDataObject.ts";

type SatContextType = {
    satData: SatData;
    setSatData: Dispatch<SetStateAction<SatData>>;
};

export const SatDataContext = createContext<SatContextType>({
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
        <SatDataContext.Provider value={{ satData, setSatData }}>
            {children}
        </SatDataContext.Provider>
    );
}

export function useSatDataContext() {
    return useContext(SatDataContext);
}

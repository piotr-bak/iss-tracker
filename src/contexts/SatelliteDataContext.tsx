import { createContext, ReactNode, useContext, useState } from "react";

import { SATELLITE_DATA_OBJECT } from "../constants/satelliteDataObject.ts";
import { SatContextType } from "../types/ContextsTypes.ts";

export const SatDataContext = createContext<SatContextType>({
    satData: SATELLITE_DATA_OBJECT,
    setSatData: () => {},
});

export function SatelliteDataContextProvider({
    children,
}: {
    children: ReactNode;
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

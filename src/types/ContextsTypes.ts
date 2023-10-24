import { Dispatch, SetStateAction } from "react";
import { SatData } from "./SatelliteDataType.ts";

export type LoadingContextType = {
    isLoaded: boolean;
    setIsLoaded: Dispatch<SetStateAction<boolean>>;
};

export type SatContextType = {
    satData: SatData;
    setSatData: Dispatch<SetStateAction<SatData>>;
};

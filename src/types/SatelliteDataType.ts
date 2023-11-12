export type TLEData = {
    tleData: string[];
};

export type SatData = {
    satName: string;
    lat: number;
    lon: number;
    alt: number;
};

export interface SatDataProviderType extends SatData {
    setSatData: (
        data: SatData
    ) => React.Dispatch<React.SetStateAction<SatData>>;
}

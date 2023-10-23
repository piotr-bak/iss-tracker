export type SatelliteDataType = {
    lat: number;
    lon: number;
    alt: number;
};

export interface SatelliteDataProviderType extends SatelliteDataType {
    setSatData: (
        data: SatelliteDataType
    ) => React.Dispatch<React.SetStateAction<SatelliteDataType>>;
}

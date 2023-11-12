// import { TLEData } from "../../types/SatelliteDataType.ts";
import { useFetch } from "../../hooks/useFetch.ts";
//import { ORBITAL_DATA_URL } from "../../constants/orbitalDataUrl.ts";
import { ORBITAL_DATA } from "../../constants/orbitalDataUrl.ts";
import { useEffect, useState } from "react";
import { splitDatasetIntoTLEs } from "../../utils/dataParsers.ts";
import { Satellite } from "./Satellite/Satellite.tsx";

export function SatConstellation() {
    const rawDataset = useFetch({
        url: ORBITAL_DATA,
        options: undefined,
        logErrors: true,
    });
    const [parsedDataset, setParsedDataset] = useState<string[][]>();
    useEffect(() => {
        if (rawDataset.data) {
            setParsedDataset(splitDatasetIntoTLEs(rawDataset.data));
        }
    }, [rawDataset.data]);

    return (
        <>
            {parsedDataset &&
                parsedDataset.map((tleData) => {
                    return (
                        <Satellite
                            tleData={tleData}
                            key={window.crypto.randomUUID()}
                        />
                    );
                })}
        </>
    );
}

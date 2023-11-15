// import { TLEData } from "../../types/SatelliteDataType.ts";
import { useFetch } from "../../hooks/useFetch.ts";
//import { ORBITAL_DATA_URL } from "../../constants/orbitalDataUrl.ts";
import { ORBITAL_DATA } from "../../constants/orbitalDataUrl.ts";
import { useEffect, useMemo, useState } from "react";
import { splitDatasetIntoTLEs } from "../../utils/dataParsers.ts";
import { Satellite } from "./Satellite/Satellite.tsx";
import { Vector3, Euler } from "three";

export function SatConstellation() {
    const rawDataset = useFetch({
        url: ORBITAL_DATA,
        options: undefined,
        logErrors: true,
    });
    const [parsedDataset, setParsedDataset] = useState<string[][]>();
    const [calculatedDataset, setCalculatedDataset] = useState<
        | {
              satName: string;
              position: Vector3;
              rotation: Euler;
          }[]
        | undefined
    >();
    const constellationWorker = useMemo(
        () =>
            new Worker(
                new URL(
                    "../../workers/constellationWorker.ts",
                    import.meta.url
                ),
                { type: "module" }
            ),
        []
    );

    useEffect(() => {
        if (rawDataset.data) {
            setParsedDataset(splitDatasetIntoTLEs(rawDataset.data));
        }
    }, [rawDataset.data]);

    useEffect(() => {
        console.log(parsedDataset);
        if (parsedDataset && window.Worker) {
            constellationWorker.postMessage(parsedDataset);
        }
    }, [parsedDataset]);

    useEffect(() => {
        constellationWorker.onmessage = (e) => {
            setCalculatedDataset(() => e.data);
        };
        return () => {
            constellationWorker.terminate;
        };
    }, [constellationWorker, calculatedDataset]);

    return (
        <>
            {calculatedDataset &&
                calculatedDataset.map((satelliteData) => {
                    if (satelliteData !== undefined) {
                        return (
                            <Satellite
                                position={satelliteData.position}
                                rotation={satelliteData.rotation}
                                key={window.crypto.randomUUID()}
                            />
                        );
                    }
                })}
        </>
    );
}

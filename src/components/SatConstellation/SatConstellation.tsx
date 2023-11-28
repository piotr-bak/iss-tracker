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

    /*
  Raw dataset: list of TLEs in form of a string;
  Raw dataset -> split into arrays of 3 subarrays each( 0: name, 1: TLE line 1,
  2: TLE line 2 ) -> saved as a parsedDataset; [using map]
  parsedDataset sent to Worker. 
  Worker calculates rotation and position from dataset for each of Elements [map
  over each element]
  Worker returns array of Objects( each having satName, position and rotation keys );
  Array returned by Worker -> saved into calculatedDataset;
  Each Sat gets rendered according to its position and rotation [again, using map]
  */

    // useEffect(() => {
    //     if (rawDataset.data) {
    //         console.log("dataset length:", rawDataset.data.length);
    //         setParsedDataset(splitDatasetIntoTLEs(rawDataset.data));
    //     }
    // }, [rawDataset.data]);

    useEffect(() => {
        //console.log(parsedDataset);
        if (rawDataset.data && window.Worker) {
            const encoder = new TextEncoder();
            const transferableArray = new Uint8Array(
                12 + 4 * Math.ceil(rawDataset.data.length / 4)
            );
            encoder.encodeInto(rawDataset.data, transferableArray);
            constellationWorker.postMessage(transferableArray, [
                transferableArray.buffer,
            ]);
        }
    }, [rawDataset.data]);

    useEffect(() => {
        constellationWorker.onmessage = (e) => {
            //data received onmessage will be an encoded array buffer. It must be
            //decoded first before being pushed to state;
            setCalculatedDataset(() => e.data);
        };
        // return () => {
        //     constellationWorker.terminate;
        // };
    }, [constellationWorker, calculatedDataset]);

    return (
        <>
            {calculatedDataset &&
                calculatedDataset.map((satelliteData) => {
                    if (satelliteData) {
                        return (
                            <Satellite
                                position={new Vector3().fromArray(
                                    satelliteData.position
                                )}
                                rotation={new Euler().fromArray(
                                    satelliteData.rotation
                                )}
                                key={window.crypto.randomUUID()}
                            />
                        );
                    }
                })}
        </>
    );
}

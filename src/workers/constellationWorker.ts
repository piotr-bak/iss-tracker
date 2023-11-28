import {
    twoline2satrec,
    gstime,
    propagate,
    eciToGeodetic,
    EciVec3,
    degreesLat,
    degreesLong,
} from "satellite.js";
import {
    splitDatasetIntoTLEs,
    nameAndOrbitFromTLE,
} from "../utils/dataParsers.ts";
import { calcSatPosition, calcSatRotation } from "../utils/satelliteHelpers.ts";

onmessage = (event) => {
    const decoder = new TextDecoder();
    const dataset = decoder.decode(event.data);
    const parsedDataset = splitDatasetIntoTLEs(dataset);
    const result = parsedDataset.map((item: string[]) => {
        const satData = nameAndOrbitFromTLE(item);
        const satrec = twoline2satrec(
            satData.orbitData[0],
            satData.orbitData[1]
        );

        const now = new Date();
        const gmst = gstime(now);
        const eci = propagate(satrec, now);

        if (eci.position) {
            const gdPos = eciToGeodetic(eci.position as EciVec3<number>, gmst);
            const lat = degreesLat(gdPos.latitude);
            const lon = degreesLong(gdPos.longitude);
            const alt = gdPos.height;
            return {
                satName: satData.satName,
                position: calcSatPosition(lat, lon, alt),
                rotation: calcSatRotation(lat, lon),
            };
        }
    });
    postMessage(result);
};

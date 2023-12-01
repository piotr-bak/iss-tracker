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
    splitDatasetIntoIndividualSatellites,
    nameAndOrbitFromTLE,
} from "../utils/dataParsers.ts";
import { calcSatPosition, calcSatRotation } from "../utils/satelliteHelpers.ts";

onmessage = (event) => {
    const decoder = new TextDecoder();
    const dataset = decoder.decode(event.data);
    const parsedDataset = splitDatasetIntoIndividualSatellites(dataset);
    let result = parsedDataset.map((item: string[]) => {
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

            // prettier-ignore
            return `${satData.satName}\n${calcSatPosition(lat, lon, alt)}\n${calcSatRotation(lat, lon)}\n`;
        }
    });
    result = result.reduce((accumulator, item) => {
        if (accumulator != null && item != null) {
            return accumulator + item;
        }
    }, "");

    if (result != null && result.length) {
        const encoder = new TextEncoder();
        const transferableArray = new Uint8Array(
            12 + 4 * Math.ceil(result.length / 4)
        );
        encoder.encodeInto(result, transferableArray);
        postMessage(transferableArray, [transferableArray.buffer]);
    }
};
